var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Todo = mongoose.model('Todo');
const actions = require('../methods/actions');




var router = express.Router();

/*
This file contains the CRUD todo routes without authentication
*/

/*
   Get one todo by username and itemname values,
   we need the both values beacuse there may be users have items with the same itemname value
   The identity of the todo is specified by two fields "itemname" and "username"
*/
router.get('/get-todo',   function(req, res){
    // Get the fields from the body
    let username = req.body.username;
    let itemname = req.body.itemname;
    //check if the username is entered
    if(!username){
        return res.status(403).json({success: false, msg: "You should be a logged user"});
    }
    //check if the itemname is entered
    if(!(itemname)){
        return res.json({success: false, msg: "You should input 'itemname' of the todd item"});
    } else {    
        Todo.findOne({itemname: itemname}, function(err, item){
            if(err) {
                // In case a database error is happened
                console.log(err.message);
                return res.status(500).json({success: "false", cause: "dbserver-err", msg:"Internal Database Server Error during search item"});
            }
            if(!item){
                // The todo item is not exist
                return res.status(422).json({success: false, msg: "There is no todo item with itemname: " + itemname});   
            }
            else{                   
                    return res.json({success: true,  todo: item });
            }
                
            
        });
    }
    
});

router.post('/add',  function(req, res){
    let username = req.body.username;
    let itemname = req.body.itemname;
    let category = req.body.category;
    if(!username){
        return res.status(403).json({success: false, msg: "You should input a username"});
    }
    if(!(itemname) || !(category)){
        return res.json({success: false, msg: "You should inter all fields: 'itemname' and 'category'"});
    }   
    
    Todo.findOne({username: username, itemname: itemname}, function(err, item){
        if(err) {
            console.log(err.message);
            return res.status(500).json({success: "false", cause: "dbserver-err", msg:"Internal Database Server Error during search item"});
        }
        if(item){
            return res.status(422).json({success: false, msg: "There is already todo item with itemname: " + itemname + " for the user: " + username });   
        }
        else{
            let item = new Todo ({
                username: username,
                itemname: itemname,
                category: category
            });
            item.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, cause:"db_error", msg: "database error during saving an item"});
                } else {
                    return res.json({success: true,  msg: "The todo item is saved successfully" });
                }
            });
        }
    });
           
        
    
});

router.post('/update',   function(req, res){
    let username = req.body.username;
    let itemname = req.body.itemname;
    let category = req.body.category;
    if(!username){
        return res.status(403).json({success: false, msg: "You should input a username"});
    }
    if(!(itemname)){
        return res.json({success: false, msg: "You should inter the 'itemname' field of the todo item you want to update "});
    }
    if(!(category)){
        return res.json({success: false, msg: "You should inter the 'category' field of the todo item you want to update "});
    }
    Todo.findOneAndUpdate({itemname: itemname}, {category: category}, function(err, item){
        if(err) {
            console.log(err.message);
            return res.status(500).json({success: "false", cause: "dbserver-err", msg:"Internal Database Server Error during search item"});
        }
        if(!item){
            return res.status(422).json({success: false, msg: "There is no todo item with itemname: " + itemname + "for the user " + username});   
        }
        else{                    
                return res.json({success: true,  msg: "The item is updated successfully" });                       
        }
    });
    
        
    
});

router.post('/delete',   function(req, res){
    let username = req.body.username;
    let itemname = req.body.itemname;
    if(!username){
        return res.status(403).json({success: false, msg: "You should input a username"});
    }
    if(!(itemname)){
        return res.json({success: false, msg: "You should inter the 'itemname' field of the todo item you want to delete"});
    }
    Todo.findOneAndDelete({itemname: itemname, username: username}, function(err, item){
        if(err) {
            console.log(err.message);
            return res.status(500).json({success: "false", cause: "dbserver-err", msg:"Internal Database Server Error during search item"});
        }
        if(!item){
            return res.status(422).json({success: false, msg: "There is no todo item with itemname: " + itemname + "for the user " + username});   
        }
        else{                    
                return res.json({success: true,  msg: "The item is deleted successfully" });                       
        }
    });
    
        
    
});



module.exports = router;