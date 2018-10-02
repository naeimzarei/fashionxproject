var Credentials = require('../../models/Credentials');

test('create new credentials', function() {
    function callback() {
        console.log('made it here!');
        expect(4).toEqual(4);
        done();
    }
    Credentials.create_credentials('sample@gmail.com', 'password', callback);
});
