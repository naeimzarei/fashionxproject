var mongoose = require('mongoose');
var config = require('../../config/config');
var bcrypt = require('bcrypt');

var credentials_controller = require('../../controllers/credentials-controller');

// beforeAll(async () => {
//     await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
// });

// afterAll(async () => {
//     await mongoose.disconnect();
// });

var id;
var email;

test('push to credentials works', async () => {
    var credentials = await credentials_controller.push('sample@gmail.com', 'password');
    id = credentials.id;

    expect(credentials.email).toEqual('sample@gmail.com');
    var hash_comparison = await bcrypt.compare('password', credentials.password);
    expect(hash_comparison).toBeTruthy();
});

test('removing new credentials works', async () => {
    var credentials = await credentials_controller.remove(id);
    var credentials_info = await credentials_controller.find(credentials.id);
    expect(credentials_info).toBeNull();
});

test('push to credentials works', async () => {
    var credentials = await credentials_controller.push('sample@gmail.com', 'password');
    id = credentials.id;
    email = credentials.email;

    expect(credentials.email).toEqual('sample@gmail.com');
    var hash_comparison = await bcrypt.compare('password', credentials.password);
    expect(hash_comparison).toBeTruthy();
});

test('finding new credentials works', async () => {
    var credentials_info = await credentials_controller.find(id);
    expect(credentials_info).not.toBeNull();
});

test('finding new credentials works, by email', async () => {
    var credentials_info = await credentials_controller.findCredentials(email);
    expect(credentials_info).not.toBeNull();
});

test('updating new credentials works', async () => {
    await credentials_controller.update(id, 'anotheremail@gmail.com', 'password');
    var credentials = await credentials_controller.find(id);
    email = credentials.email;
    expect(credentials.email).toEqual('anotheremail@gmail.com');
});

test('updating new credentials works, by email', async () => {
    await credentials_controller.updateCredentials(email, 'newemail@gmail.com', 'Password1');
    var credentials = await credentials_controller.findCredentials('newemail@gmail.com');
    expect(credentials.email).toEqual('newemail@gmail.com');
});

test('removing new credentials works', async () => {
    var credentials = await credentials_controller.remove(id);
    var credentials_info = await credentials_controller.find(credentials.id);
    expect(credentials_info).toBeNull();
});

test('removing new credentials works, by email', async () => {
    await credentials_controller.push('sample@gmail.com', 'password');
    await credentials_controller.removeCredentials('sample@gmail.com');
    var credentials_info = await credentials_controller.findCredentials(email);
    expect(credentials_info).toBeNull();
});