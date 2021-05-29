const mongoose= require('mongoose');


const medSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

});


const Meds= mongoose.model('Meds',medSchema);

module.exports= Meds;