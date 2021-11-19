var express = require('express');
const actions = require('../methods/actions');

var router = express.Router();

router.post('/', actions.authenticate, function(req, res){
    let result = res.locals.result;    
    res.json(result);
});

module.exports = router;