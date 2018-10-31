const app = require('../../app');
var mongoose = require('mongoose');
const request = require('supertest');
var config = require('../../config/config');
var post_controller = require('../../controllers/post-controller');

describe('GET /users', () => {
  beforeAll(async () => {
    connection = await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
    db = await mongoose.connection;
  });

  afterAll(async() => {
    await connection.disconnect();
  });

  test('should return posts belonging to a certain account', async () => {
    var posts = await post_controller.findAll('test@gmail.com');
    expect(posts).not.toBeNull();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(2);
  });

  test('should return no posts when in valid account id', async () => {
    var posts = await post_controller.findAll('invalidAccount@example.com');
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(0);
  });
});