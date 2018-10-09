var mongoose = require('mongoose');
var config = require('../../config/config');
var bcrypt = require('bcrypt');

var auth_controller = require('../../controllers/auth-controller');

beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
});

afterAll(async () => {
    await mongoose.disconnect();
});

var id;

test('push to auth works', async () => {
    var auth = await auth_controller.push('email@gmail.com', 'password');
    id = auth.id;
    var auth_info = await auth_controller.find(auth.id);
    expect(auth_info.email).toEqual('email@gmail.com');
    let res = await bcrypt.compare('password', auth_info.hash);
    expect(res).toBeTruthy();
});

test('finding new auth works', async () => {
    var auth = await auth_controller.find(id);
    expect(auth).not.toBeNull();
});

test('updating new auth works', async () => {
    var auth = await auth_controller.update(id, 
        'anotheremail@gmail.com',
        'anotherpassword'
    );
    var auth_info = await auth_controller.find(auth.id);
    expect(auth_info.email).toEqual('anotheremail@gmail.com');
    var res = await bcrypt.compare('anotherpassword', auth_info.hash);
    expect(res).toBeTruthy();
});

test('removing new auth works', async () => {
    var auth = await auth_controller.remove(id);
    var auth_info = await auth_controller.find(auth.id);
    expect(auth_info).toBeNull();
});