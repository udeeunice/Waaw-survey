const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName :{
        type: String
    },
    lastName :{
        type: String
    },
    emailAddress :{
        type: String
    },
    phoneNo :{
        type: Number
    },
    userId :{
        type: String
    }
});


const User = mongoose.model('Users', userSchema);

module.exports = User;