var mongoose = require('mongoose');
var config = require('../../config/config');

var rights_controller = require('../../controllers/rights-controller');

beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
});

afterAll(async () => {
    await mongoose.disconnect();
});

var id;

test('push to rights works', async () => {
    var rights = await rights_controller.push('sample@gmail.com', 'moderator');
    id = rights.id;

    expect(rights.email).toEqual('sample@gmail.com');
    expect(rights.rights).toEqual('moderator');
});

test('removing new rights works', async () => {
    var rights = await rights_controller.remove(id);
    var rights_info = await rights_controller.find(rights.id);
    expect(rights_info).toBeNull();
});

test('push to rights works', async () => {
    var rights = await rights_controller.push('sample@gmail.com', 'moderator');
    id = rights.id;

    expect(rights.email).toEqual('sample@gmail.com');
    expect(rights.rights).toEqual('moderator');
});

test('finding new rights works', async () => {
    var rights_info = await rights_controller.find(id);
    expect(rights_info).not.toBeNull();
});

test('updating new rights works', async () => {
    await rights_controller.update(id, 'anotheremail@gmail.com', 'influencer');
    var rights = await rights_controller.find(id);
    expect(rights.email).toEqual('anotheremail@gmail.com');
});

test('removing new rights works', async () => {
    var rights = await rights_controller.remove(id);
    var rights_info = await rights_controller.find(rights.id);
    expect(rights_info).toBeNull();
});