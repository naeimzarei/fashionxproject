var mongoose = require('mongoose');
var config = require('../../config/config');

var profile_controller = require('../../controllers/profile-controller');

// beforeAll(async () => {
//     await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
// });

// afterAll(async () => {
//     await mongoose.disconnect();
// });

var id;
var email;

test('push to profile should require fields', async() => {
    try {
        var profile = await profile_controller.push(
            'James'
        );
    } catch (err) {
        expect(err).toBeTruthy();
    }
});

test('push to profile should require age to be greater than 18', async() => {
    try {
        var profile = await profile_controller.push(
            'James', 'email@gmail.com', 17, 'handle',
            '', 5, 8, 143, 'C', 'Band C', 33, 33,
            'Medium (M)', 'Medium (M)', 33
        );
    } catch (err) {
        expect(err).toBeTruthy();
    }
});

test('push to profile should require height ft to be integer', async() => {
    try {
        var profile = await profile_controller.push(
            'James', 'email@gmail.com', 17, 'handle',
            '', 'abc', 8, 143, 'C', 'Band C', 33, 33,
            'Medium (M)', 'Medium (M)', 33
        );
    } catch (err) {
        expect(err).toBeTruthy();
    }
});

test('push to profile should require height in to be integer', async() => {
    try {
        var profile = await profile_controller.push(
            'James', 'email@gmail.com', 17, 'handle',
            '', 5, 'abc', 143, 'C', 'Band C', 33, 33,
            'Medium (M)', 'Medium (M)', 33
        );
    } catch (err) {
        expect(err).toBeTruthy();
    }
});

test('push to profile should require weight to be integer', async() => {
    try {
        var profile = await profile_controller.push(
            'James', 'email@gmail.com', 17, 'handle',
            '', 5, 1, 'abc', 'C', 'Band C', 33, 33,
            'Medium (M)', 'Medium (M)', 33
        );
    } catch (err) {
        expect(err).toBeTruthy();
    }
});

test('push to profile should require waist to be integer', async() => {
    try {
        var profile = await profile_controller.push(
            'James', 'email@gmail.com', 17, 'handle',
            '', 5, 1, 120, 'C', 'Band C', 'abc', 33,
            'Medium (M)', 'Medium (M)', 33
        );
    } catch (err) {
        expect(err).toBeTruthy();
    }
});

test('push to profile should require hips to be integer', async() => {
    try {
        var profile = await profile_controller.push(
            'James', 'email@gmail.com', 17, 'handle',
            '', 5, 1, 120, 'C', 'Band C', 33, 'abc',
            'Medium (M)', 'Medium (M)', 33
        );
    } catch (err) {
        expect(err).toBeTruthy();
    }
});

test('push to profile should require leg length to be integer', async() => {
    try {
        var profile = await profile_controller.push(
            'James', 'email@gmail.com', 17, 'handle',
            '', 5, 1, 120, 'C', 'Band C', 33, 33,
            'Medium (M)', 'Medium (M)', 'abc'
        );
    } catch (err) {
        expect(err).toBeTruthy();
    }
});

test('push to profile works, no blog', async() => {
    var profile = await profile_controller.push(
        'James', 'email@gmail.com', 18, 'handle',
        '', 5, 8, 143, 'C', 'Band C', 33, 33,
        'Medium (M)', 'Medium (M)', 33
    );
    id = profile.id;
    email = 'email@gmail.com';

    expect(profile.first_name).toEqual('James');
    expect(profile.email).toEqual('email@gmail.com');
    expect(profile.age).toBe(18);
    expect(profile.instagram_handle).toEqual('handle');
    expect(profile.blog).toEqual('');
    expect(profile.height_ft).toBe(5);
    expect(profile.height_in).toBe(8);
    expect(profile.weight).toBe(143);
    expect(profile.bust_cup).toEqual('C');
    expect(profile.bust_band).toEqual('Band C');
    expect(profile.waist).toBe(33);
    expect(profile.hips).toBe(33);
    expect(profile.jean_size).toEqual('Medium (M)');
    expect(profile.shirt_size).toEqual('Medium (M)');
    expect(profile.leg_length).toBe(33);
});

test('finding new profile works, no blog', async () => {
    var profile = await profile_controller.find(id);
    expect(profile).not.toBeNull();
});

test('finding new profile works, by email', async () => {
    var profile = await profile_controller.findProfile(email);
    expect(profile).not.toBeNull();
});

test('updating new profile works, no blog', async () => {
    var profile = await profile_controller.update(id,
        'Peter', 'anotheremail@gmail.com', 22, 'anotherhandle',
        '', 4, 7, 140, 'B', 'Band B', 43, 43,
        'Small (S)', 'Small (S)', 43
    );
    profile = await profile_controller.find(id);
    expect(profile.first_name).toEqual('Peter');
    expect(profile.email).toEqual('anotheremail@gmail.com');
    expect(profile.age).toBe(22);
    expect(profile.instagram_handle).toEqual('anotherhandle');
    expect(profile.blog).toEqual('');
    expect(profile.height_ft).toBe(4);
    expect(profile.height_in).toBe(7);
    expect(profile.weight).toBe(140);
    expect(profile.bust_cup).toEqual('B');
    expect(profile.bust_band).toEqual('Band B');
    expect(profile.waist).toBe(43);
    expect(profile.hips).toBe(43);
    expect(profile.jean_size).toEqual('Small (S)');
    expect(profile.shirt_size).toEqual('Small (S)');
    expect(profile.leg_length).toBe(43);
});

test('updating new profile works, blog', async () => {
    var profile = await profile_controller.update(id,
        'Xavier', 'yetanotheremail@gmail.com', 25, 'yetanotherhandle',
        'myblog.com', 6, 3, 141, 'A', 'Band A', 22, 22,
        'Large (L)', 'Large (L)', 22
    );
    profile = await profile_controller.find(id);
    expect(profile.first_name).toEqual('Xavier');
    expect(profile.email).toEqual('yetanotheremail@gmail.com');
    expect(profile.age).toBe(25);
    expect(profile.instagram_handle).toEqual('yetanotherhandle');
    expect(profile.blog).toEqual('myblog.com');
    expect(profile.height_ft).toBe(6);
    expect(profile.height_in).toBe(3);
    expect(profile.weight).toBe(141);
    expect(profile.bust_cup).toEqual('A');
    expect(profile.bust_band).toEqual('Band A');
    expect(profile.waist).toBe(22);
    expect(profile.hips).toBe(22);
    expect(profile.jean_size).toEqual('Large (L)');
    expect(profile.shirt_size).toEqual('Large (L)');
    expect(profile.leg_length).toBe(22);
});

test('updating new profile works, by email', async () => {
    await profile_controller.updateProfile(
        'John', 'yetanotheremail@gmail.com', 27, 'yetanotherhandletwo',
        'myblogs.com', 4, 2, 143, 'B', 'Band B', 24, 24,
        'Small (S)', 'Small (S)', 14
    );
    var profile = await profile_controller.findProfile('yetanotheremail@gmail.com');
    expect(profile.first_name).toEqual('John');
    expect(profile.email).toEqual('yetanotheremail@gmail.com');
    expect(profile.age).toBe(27);
    expect(profile.instagram_handle).toEqual('yetanotherhandletwo');
    expect(profile.blog).toEqual('myblogs.com');
    expect(profile.height_ft).toBe(4);
    expect(profile.height_in).toBe(2);
    expect(profile.weight).toBe(143);
    expect(profile.bust_cup).toEqual('B');
    expect(profile.bust_band).toEqual('Band B');
    expect(profile.waist).toBe(24);
    expect(profile.hips).toBe(24);
    expect(profile.jean_size).toEqual('Small (S)');
    expect(profile.shirt_size).toEqual('Small (S)');
    expect(profile.leg_length).toBe(14);
});

test('removing new profile works, no blog', async () => {
    var profile = await profile_controller.remove(id);
    var profile_info = await profile_controller.find(profile.id);
    expect(profile_info).toBeNull();
});

test('removing new profile works, by email', async () => {
    var profile = await profile_controller.push(
        'James', 'email@gmail.com', 18, 'handle',
        '', 5, 8, 143, 'C', 'Band C', 33, 33,
        'Medium (M)', 'Medium (M)', 33
    );
    await profile_controller.removeProfile('email@gmail.com');
});