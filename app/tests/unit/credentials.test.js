var Credentials = require('../../models/Credentials');
var mongoose = require('mongoose');

var connection;
var db;

beforeAll(async () => {
    connection = await mongoose.connect('mongodb+srv://tester:<password>@cluster0-zz5rm.mongodb.net/users', { useNewUrlParser: true });
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