var Credentials = require('../../models/Credentials');
var mongoose = require('mongoose');
var config = require('../../config/config');
var bcrypt = require('bcrypt');

var credentials_controller = require('../../controllers/credentials-controller');

beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
});

afterAll(async () => {
    await mongoose.disconnect();
});

var id;
var email;
var password;

test('push to credentials works', async () => {
    var credentials = await credentials_controller.push('sample@gmail.com', 'password');
    id = credentials.id;

    expect(credentials.email).toEqual('sample@gmail.com');
    var hash_comparison = await bcrypt.compare('password', credentials.password);
    expect(hash_comparison).toBeTruthy();
});

test('remove new credentials works', async () => {
    var credentials = await credentials_controller.remove(id);
    var credentials_info = await credentials_controller.find(credentials.id);
    expect(credentials_info).toBeNull();
});

test('push to credentials works', async () => {
    var credentials = await credentials_controller.push('sample@gmail.com', 'password');
    id = credentials.id;

    expect(credentials.email).toEqual('sample@gmail.com');
    var hash_comparison = await bcrypt.compare('password', credentials.password);
    expect(hash_comparison).toBeTruthy();
});

test('finding new credentials works', async () => {
    var credentials_info = await credentials_controller.find(id);
    expect(credentials_info).not.toBeNull();
});

test('updating new credentials works', async () => {
    await credentials_controller.update(id, 'anotheremail@gmail.com', 'password');
    var credentials = await credentials_controller.find(id);
    expect(credentials.email).toEqual('anotheremail@gmail.com');
});

test('remove new credentials works', async () => {
    var credentials = await credentials_controller.remove(id);
    var credentials_info = await credentials_controller.find(credentials.id);
    expect(credentials_info).toBeNull();
});