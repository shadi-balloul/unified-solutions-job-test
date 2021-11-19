# Unified Solutions Job Test

The schema of th todo that I used contains two fields as the info of the model, they are: "itemname" and "category". The first is of String type, the secon is also of the STring type but it can be one of three values: ['category-a', 'category-b','category-c']> I added the field "username" which identify the user who has the Todo item. The field "userId" is added to maintain the refrence integrity in case the authenticated functions, the user is realy in the database. The schema is below:

```
var todoSchema = new Schema({  
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, required : true},
    itemname: {type: String, required : true},
    category:{type: String, enum: ['category-a', 'category-b','category-c']},        
    date: {type: Date, default: Date.now}
});
```
