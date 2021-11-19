# Unified Solutions Job Test

First of all, I am sorry cause I started the extra requirements authentication from the begining. I developed all the todo CRUD functions in two cases: with authentication and without authentication. For each function there is two instanses.

The schema of th todo that I used contains two fields as the info of the model, they are: "itemname" and "category". The first is of String type, the second is also of the STring type but it can be one of three values: ['category-a', 'category-b','category-c']. I added the field "username" which identify the user who has the Todo item. The field "userId" is added to maintain the refrence integrity in case the authenticated functions, the user is realy in the database. The schema is below:

```
var todoSchema = new Schema({  
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, required : true},
    itemname: {type: String, required : true},
    category:{type: String, enum: ['category-a', 'category-b','category-c']},        
    date: {type: Date, default: Date.now}
});
```
I have added the User model to enable users to register, login then authenticate. I used the JWT (JSON Web Token) method to achieve the authentication. I saved the passwords encrypted in the database. I used the node.js package "encryptjs". After the register api is requested successfully, the user can request the login api which return the token string. When any authenticated api is requested, the string token should be intered in the "Authorization" tab in the request form in the Postman, the "Bearer" choise should be chosen from the drop list. However, I have added examples to the postman collections that I hve added to the github repo.

The fields of the RESTfull APIs is recived as body fields, and it is encoded using the choise urlencoded of the "body-parser" package. As the result, when requesting the restfull apis using Postman. the fields shold be entered in the choice "x-www-form-urlencoded" in the Body tab in the request form in Postman.

I tried to check most of senarios when requesting the apis, there are few validation operations that can be made. I am working on them and I am working on seeding the database.
