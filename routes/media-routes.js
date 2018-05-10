'use strict';
module.exports = function(app) {
    const media = require('../controllers/media-controller');

    app.route('/media/:userId?/:mediaId?')
        .get(media.fetchMedia);

    app.route('/media/:userId')
        .post(media.uploadMedia);
};