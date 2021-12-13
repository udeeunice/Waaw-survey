const mongoose = require('mongoose');
const {Schema} = mongoose;

const surveySchema = new Schema({
    title :{
        type: String
    },
    description :{
        type: String
    },
    location :{
        type: String
    },
    startDate :{
        type: Date
    },
    endDate :{
        type: Date
    },
    userid :{
        type: String
    }
});


const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;