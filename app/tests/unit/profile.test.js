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

  test('should not allow age to be text', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 'abc',
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

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    };
  });

  test('should not allow height ft to be text', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 30,
      instagram_handle: 'testInsta',
      blog: 'www.example.com',
      height_ft: 'abc',
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

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    };
  });

  test('should not allow height in to be text', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 30,
      instagram_handle: 'testInsta',
      blog: 'www.example.com',
      height_ft: 6,
      height_in: 'abc',
      weight: 123,
      bust_cup: 'D',
      bust_band: 'Band B',
      waist: 33,
      hips: 33,
      jean_size: 'Medium (M)',
      shirt_size: 'Small (S)',
      leg_length: 33
    };

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    };
  });

  test('should not allow height in inches to exceed 13', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 30,
      instagram_handle: 'testInsta',
      blog: 'www.example.com',
      height_ft: 10,
      height_in: 13,
      weight: 123,
      bust_cup: 'D',
      bust_band: 'Band B',
      waist: 33,
      hips: 33,
      jean_size: 'Medium (M)',
      shirt_size: 'Small (S)',
      leg_length: 33
    };

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    };
  });

  test('should not allow weight to be less than 18', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 30,
      instagram_handle: 'testInsta',
      blog: 'www.example.com',
      height_ft: 10,
      height_in: 13,
      weight: 17,
      bust_cup: 'D',
      bust_band: 'Band B',
      waist: 33,
      hips: 33,
      jean_size: 'Medium (M)',
      shirt_size: 'Small (S)',
      leg_length: 33
    };

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    };
  });

  test('should not allow weight to be text', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 30,
      instagram_handle: 'testInsta',
      blog: 'www.example.com',
      height_ft: 10,
      height_in: 13,
      weight: 'abc',
      bust_cup: 'D',
      bust_band: 'Band B',
      waist: 33,
      hips: 33,
      jean_size: 'Medium (M)',
      shirt_size: 'Small (S)',
      leg_length: 33
    };

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    };
  });

  test('should not allow hips to be text', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 30,
      instagram_handle: 'testInsta',
      blog: 'www.example.com',
      height_ft: 10,
      height_in: 13,
      weight: 100,
      bust_cup: 'D',
      bust_band: 'Band B',
      waist: 33,
      hips: 'abc',
      jean_size: 'Medium (M)',
      shirt_size: 'Small (S)',
      leg_length: 33
    };

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    };
  });

  test('should not allow leg length to be text', async () => {
    let data = {
      first_name: 'John Doe',
      email: 'john@example.com',
      password: 'test',
      age: 30,
      instagram_handle: 'testInsta',
      blog: 'www.example.com',
      height_ft: 10,
      height_in: 13,
      weight: 100,
      bust_cup: 'D',
      bust_band: 'Band B',
      waist: 33,
      hips: 30,
      jean_size: 'Medium (M)',
      shirt_size: 'Small (S)',
      leg_length: 'abc'
    };

    try {
      await request(app).post('/influencers/signup').send(data);
    } catch (err) {
      expect(err).toBeTruthy();
    };
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