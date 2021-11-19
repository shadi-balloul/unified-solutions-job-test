var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var router = express.Router();

router.post('/',  function(req, res){

    if ((!req.body.username) || (!req.body.password)) {
        return res.json({success: false, msg: 'Enter all fields'});
    }
    else {
        User.findOne({username: req.body.username}, function(err, user){
            if(err) {
                console.log(err.message);
                return res.status(500).json({success: "false", cause: "dbserver-err", msg:"Internal Database Server Error during search user"});
            }
            if(user){
                return res.status(422).json({success: false, msg: "The username '" + req.body.username + "' is already exist"});   
            }
            else{

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
    }
});
module.exports = router;