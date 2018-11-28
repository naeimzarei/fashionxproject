var rights_controller = require('../../controllers/rights-controller');

var id;
var email;

test('push to rights works', async () => {
    var rights = await rights_controller.push('sample@gmail.com', 'moderator');
    id = rights.id;

    expect(rights.email).toEqual('sample@gmail.com');
    expect(rights.rights).toEqual('moderator');
});


test('push to rights works', async () => {
    var rights = await rights_controller.push('sample@gmail.com', 'moderator');
    id = rights.id;
    email = rights.email;

    expect(rights.email).toEqual('sample@gmail.com');
    expect(rights.rights).toEqual('moderator');
});

test('finding new rights works, by email', async () => {
    var rights_info = await rights_controller.findRights(email);
    expect(rights_info).not.toBeNull();
});

test('updating new rights works, by email', async () => {
    await rights_controller.updateRights('anotheremail@gmail.com', 'shopper');
    var rights = await rights_controller.findRights('anotheremail@gmail.com');
    expect(rights.rights).toEqual('shopper');
    expect(rights.email).toEqual('anotheremail@gmail.com');
});