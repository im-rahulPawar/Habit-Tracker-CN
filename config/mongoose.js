// this is to connect the mongo DB
const mongoose = require('mongoose');

// storing the db on mongo atlas
const DB = "mongodb+srv://pawarrahul1172000:0SeW0g7Prqp56IyQ@cluster0.xffoxur.mongodb.net/Habit-Tracker";

mongoose.connect(DB).then(()=>{
    console.log('Connection successful!');
}).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;