const mongoose = require('mongoose');
const ArticlesModel = mongoose.model('articles');
mongoose.Promise = global.Promise;
const commonFunction = require('../common/common_function');
const _ = require('lodash');

exports.get = (req, res) => {
    const articleId = req.query['id'];
    ArticlesModel.findById(articleId, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: '查找失败',
                data: []
            });
        } else {
            res.jsonp({
                data: [result]
            });
        }
    });
};

exports.add = (req, res) => {
    req.body['articleId'] = commonFunction.getRandom();
    req.body['modifyOn'] = new Date();
    const article = new ArticlesModel(req.body);
    article.save((err) => {
        if (err) {
            return res.status(400).send({
                message: '新增失败',
                data: []
            });
        } else {
            res.jsonp({
                data: [article]
            });
        }
    })
};

exports.remove = (req, res) => {
    const id = req.query['id'];
    ArticlesModel.remove({'_id': id}, (err) => {
        if (err) {
            return res.status(400).send({
                message: '删除失败',
                data: []
            });
        } else {
            res.jsonp({
                status: 1
            });
        }
    })
};

exports.update = (req, res) => {
    const id = req.body['id'];
    ArticlesModel.findById(id, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: '更新失败',
                data: []
            });
        } else {
            delete req.body['id'];
            const articles = _.extend(result, req.body);
            articles.save((err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: '更新失败',
                        data: []
                    });
                } else {
                    res.jsonp({
                        data: [articles]
                    });
                }
            })
        }
    })
};

/**
 *  进阶篇
 */

exports.getAuthorByArticleid = (req, res) => {
    ArticlesModel.findById(req.query.id)
        .populate('by', 'name -_id')
        .exec(function (err, story) {
            if (err) {
                return res.status(400).send({
                    message: '更新失败',
                    data: []
                });
            }
            res.jsonp({
                data: [story]
            })
        });
};
