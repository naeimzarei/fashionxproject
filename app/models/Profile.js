var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tester:<password>@cluster0-zz5rm.mongodb.net/users/profile', { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', () => {
    console.log('Error connecting to database.');
})

db.once('open', () => {
    
});

// schema 
var credentialsSchema = new mongoose.Schema({
    email: String,
    password: String
});

// methods 


// model
var Credentials = mongoose.model('Credentials', credentialsSchema);