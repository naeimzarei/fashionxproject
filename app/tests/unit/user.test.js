const app = require('../../app');
var mongoose = require('mongoose');
const request = require('supertest');
var config = require('../../config/config');

describe('GET /users', () => {
  beforeAll(async () => {
    connection = await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
    db = await mongoose.connection;
  });

  afterAll(async() => {
    await connection.disconnect();
  });

  test('should return an array of users', async () => {
    const result = await request(app).get('/users');
    expect(Array.isArray(result.body)).toBe(true);
  });
});