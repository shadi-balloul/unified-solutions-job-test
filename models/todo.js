var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema({  
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, required : true},
    itemname: {type: String, required : true},
    category:{type: String, enum: ['category-a', 'category-b','category-c']},        
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Todo', todoSchema);