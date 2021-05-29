const mongoose= require('mongoose');
//const bcrypt= require('bcryptjs');
//const passportLocalMongoose= require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    /*phone: {
        type: Number,
        required: true
    },*/

    password: {
        type: String,
        required: true
    },

    cpassword:{
        type: String,
        required: true
    }

});


const Register= mongoose.model('Register',userSchema);

module.exports= Register;