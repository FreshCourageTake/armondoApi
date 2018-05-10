'use strict';
module.exports = function(app) {
    const users = require('../controllers/user-controller');

    app.route('/user')
        .get(users.fetchAllUsers);

    app.route('/user/:userId')
        .get(users.fetchUser);
};