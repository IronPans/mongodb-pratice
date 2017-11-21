const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    province: {type: String},
    city: {type: String},
    person: {type: Number},
    industry: {
        type: [
            {
                name: String, person: Number
            }
        ]
    }
}, {collection: 'citys'});

mongoose.model('City', citySchema);