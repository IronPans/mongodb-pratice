const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const plugins = require('../common/plugins');

/**
 * 基础篇
 */
//const ArticlesSchema = new Schema({
//    articleId: {type: String},
//    title: { type: String },
//    content: { type: String },
//    by: { type: String},
//    modifyOn: { type: Date, default: Date.now },
//}, { collection: 'articles' });
//
//mongoose.model('articles', ArticlesSchema);

/**
 * 进阶篇
 */
const ArticlesSchema = new Schema({
    title: {
        type: String,
        index: true
    },
    content: { type: String },
    by: { type: Schema.Types.ObjectId, ref: 'users' },
    modifyOn: { type: Date, default: Date.now },
}, { collection: 'articles' });

ArticlesSchema.plugin(plugins.lastModified);

ArticlesSchema.set('autoIndex', false);

mongoose.model('articles', ArticlesSchema);