var Credentials = require('../../models/Credentials');
var mongoose = require('mongoose');
var config = require('../../config/config');

var connection;
var db;

beforeAll(async () => {
    connection = await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });
    db = await mongoose.connection;
});

afterAll(async() => {
    await connection.disconnect();
});

test('create new credentials', async() => {
    var credentials = new Credentials({
        email: 'anexampleemail@gmail.com',
        password: 'password'
    });

    return await credentials.save().then((product) => {
        console.log('product', product);
    });
});