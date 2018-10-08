var Credentials = require('../../models/Credentials');
var mongoose = require('mongoose');
var config = require('../../config/config');

var Profile = require('../../models/Profile');
var signup_controller = require('../../controllers/signup-controller');

beforeAll(() => {
    mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
});

afterAll(() => {
    mongoose.disconnect();
});

test('push to profile works', async () => {
    const data = {
        first_name: 'Apple',
        email: 'apple@gmail.com',
        password: 'password',
        age: 18,
        instagram_handle: 'handle',
        blog: 'blog.com',
        height_ft: 5,
        height_in: 8,
        weight: 143,
        bust_cup: 'C',
        bust_band: 'Band B',
        waist: 143,
        hips: 33,
        jean_size: 'Medium (M)',
        shirt_size: 'Medium (M)',
        leg_length: 33
    };
    var profile = new Profile(data);
    await profile.save();
});