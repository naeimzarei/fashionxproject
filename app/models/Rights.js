// schema 
var rightsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    rights: {
        type: String,
        required: true
    }
});

var Rights = mongoose.model('Rights', rightsSchema, 'rights');
module.exports = Rights;