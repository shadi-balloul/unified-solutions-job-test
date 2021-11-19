const mongoose = require('mongoose');
const dbConfig = require('./dbconfig');

const connectDB = async() => {
    try {
        let connString = dbConfig.database1;
        if(process.env.PORT)
            connString =  dbConfig.database2;
        const conn = await mongoose.connect(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// When closed reconnect
mongoose.connection.on('disconnected', function () {
   // connectDB();
});

module.exports = connectDB;