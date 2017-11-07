const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Articles = new Schema({
    articleId: {type: String},
    title: { type: String },
    content: { type: String },
    by: { type: String},
    modifyOn: { type: Date, default: Date.now },
}, { collection: 'articles' });

mongoose.model('articles', Articles);