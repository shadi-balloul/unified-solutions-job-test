var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/dbconfig');
var utils = require('../app/util');
var sanitize = require('mongo-sanitize');

var functions = {
    addUser: function (req, res) {
        if ((!req.body.username) || (!req.body.password)) {
            res.json({success: false, msg: 'Enter all fields'});
        }
        else {
            var newUser = User({
                username: req.body.username,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'});
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'});
                }
            });
        }
    },
    authenticate: function (req, res, next) {
        User.findOne({
            username: req.body.username
            
        }, function (err, user) {
                if (err) throw err;
                if (!user) {
                    return res.send({success: false, msg: 'Authentication Failed, User not found'});
                }

                else {
                   
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            let u = {username: user.username};
                            console.log("from authenticate... " + u.username);
                            var jtoken = jwt.encode(u, config.secret);
                           
                            res.locals.result = {success: true, jtoken: jtoken};
                            next();
                        }
                        else {
                            return res.send({success: false, msg: 'Authentication failed, wrong password'});
                        }
                    });
                }
        }
        );
    },
    getUser:function(req, res, next){
        console.log("from getUser");
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var jwttoken = req.headers.authorization.split(' ')[1];
            var decodedtoken;
            //console.log("jwttoken= " + jwttoken)
            try{    
                decodedtoken = jwt.decode(jwttoken, config.secret);
                res.locals.username = decodedtoken.username;
            }
            catch(e){
                //console.log("decode jwtoken..");
                console.log(e);
                return res.json({success: false, msg: "Bad token"});
            }
            next();
        }
        else{
            return res.json({success: false, msg: "No Loged user"})
        }
    }

}
;


module.exports = functions;