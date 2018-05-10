'use strict';

var db = require('../dbconnection'),
    HttpStatus = require('http-status-codes'),
    formidable = require('formidable'),
    fs = require('fs'),
    moment = require('moment'),
    constants = require('../util/constants');

exports.fetchMedia = function (req, res) {
    var userId = req.params.userId,
        mediaId = req.params.mediaId;

    if (userId) {
        if (mediaId) {
            db.query("Select * from uploaded_media where user_id = " + userId + " and id = " + mediaId, function (error, results, fields) {
                if (error) {
                    return res.status(HttpStatus.BAD_REQUEST).send({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST) });
                }
                return res.status(HttpStatus.OK).send({ media: results, message: "single file" });
            });
        } else {
            db.query("Select * from uploaded_media where user_id = " + userId, function (error, results, fields) {
                if (error) {
                    return res.status(HttpStatus.BAD_REQUEST).send({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST) });
                }
                return res.status(HttpStatus.OK).send({ media: results, message: "all media" });
            });
        }
    } else {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST) });
    }
};

exports.uploadMedia = function (req, res) {
    var userId = req.params.userId;

    if (userId) {
        var form = new formidable.IncomingForm(),
            userDir = constants.userUploadDirectory + userId + "/";

        form.uploadDir = userDir;
        form.keepExtensions = true;

        // TODO: Make this async
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }

        form.parse(req, function (err, fields, files) {

            if (err) {
                return res.status(HttpStatus.BAD_REQUEST).send({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST) });
            } else {
                var dateUploaded = moment().format('YYYY-MM-DD'),
                    query = 'insert into uploaded_media (user_id, name, filepath, size, type, date_uploaded)                     values (' + userId + ', \'' + files.file.name + '\', \'' + files.file.path + '\', ' + files.file.size + ', \'' + files.file.type + '\', \'' + dateUploaded + '\')';

                db.query(query, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
                    }
                    return res.status(HttpStatus.OK).send({ id: results.insertId, name: files.file.name, size: files.file.size, dateUploaded: dateUploaded });
                });
            }
        });
    } else {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST) });
    }
};
//# sourceMappingURL=media-controller.js.map