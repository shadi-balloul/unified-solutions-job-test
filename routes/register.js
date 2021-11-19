var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
//var actions = require('../models/user');
var router = express.Router();

router.post('/',  function(req, res){
    console.log("req.body.username= " + req.body.username)

    if ((!req.body.username) || (!req.body.password)) {
        return res.json({success: false, msg: 'Enter all fields'});
    }
    else {
        var newUser = User({
            username: req.body.username,
            password: req.body.password
        });
        newUser.save(function (err, user) {
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Failed to save'});
            }
            else {
                return res.json({success: true, msg: 'Successfully saved'});
            }
        });
    }
});
module.exports = router;