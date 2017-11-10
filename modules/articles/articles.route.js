const articleControllder = require('./articles.controller');

module.exports = (app) => {
    app.route('/api/article/add')
        .post(articleControllder.add);

    app.route('/api/article/find')
        .get(articleControllder.get);

    app.route('/api/article/remove')
        .delete(articleControllder.remove);

    app.route('/api/article/update')
        .put(articleControllder.update);

    /**
     * 进阶篇
     */
    app.route('/api/article/authorByArticleid')
        .get(articleControllder.getAuthorByArticleid);
};