const usersController = require('./users.controller');

module.exports = (app) => {
    app.route('/api/users/save')
        .post(usersController.save);
    app.route('/api/users/address')
        .get(usersController.getAddress);
};