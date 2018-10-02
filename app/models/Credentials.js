var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tester:<password>@cluster0-zz5rm.mongodb.net/users/credentials', { useNewUrlParser: true });
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
credentialsSchema.methods.getEmail = () => {
    return this.email;
};

credentialsSchema.once.getPassword = () => {
    return this.password;
};

// model
var Credentials = mongoose.model('Credentials', credentialsSchema);