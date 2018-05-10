const db = require('../dbconnection'),
    HttpStatus = require('http-status-codes');

exports.fetchAllUsers = function(req, res) {
    db.query("Select * from users", function(error, results, fields) {
        if (error) throw error;
        return res
            .status(HttpStatus.OK)
            .send({error: false, data: results, message: "All Users"});
    });
};

exports.fetchUser = function(req, res) {
    const id = req.params.userId;
    db.query("Select * from users where id = " + id, function(error, results, fields) {
        if (error) throw error;
        return res
            .status(HttpStatus.OK)
            .send({error: false, data: results, message: "All Users"});
    });
};