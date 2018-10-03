const app = require('../../app');
var mongoose = require('mongoose');
const request = require('supertest');
var config = require('../../config/config');

describe.only('POST /influencers/signup', () => {
  beforeAll(async () => {
    connection = await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
    db = await mongoose.connection;
  });

  afterAll(async() => {
    await connection.disconnect();
  });

  test('should return an error for incomplete data', async () => {
    let data = {
      first_name: 'Incomplete profile'
    };

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });

  test('should create and return new profile', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 30,
      instagram_handle: 'testInsta',
      blog: 'www.example.com',
      height_ft: 5,
      height_in: 10,
      weight: 123,
      bust_cup: 'D',
      bust_band: 'Band B',
      waist: 33,
      hips: 33,
      jean_size: 'Medium (M)',
      shirt_size: 'Small (S)',
      leg_length: 33
    };

    delete data.password;
    return await request(app).post('/influencers/signup')
      .send(data)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.profile).toMatchObject(data);

        var Profile = mongoose.model('Profile');
        Profile.deleteOne({email: response.body.profile.email }, function (err) {
          if (err) console.log(err);
        });
      });
  });
});