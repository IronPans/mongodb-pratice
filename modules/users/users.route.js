const usersController = require('./users.controller');

module.exports = (app) => {
    app.route('/api/users/save')
        .post(usersController.save);
    app.route('/api/users/address')
        .get(usersController.getAddress);

    app.route('/api/users/userList')
        .get(usersController.getUserList);


    /**
     * 高级篇
     */
    app.route('/api/users/getArticleByUser')
        .get(usersController.getArticleByUser);
};