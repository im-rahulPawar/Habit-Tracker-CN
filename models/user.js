const mongoose = require('mongoose');

// creating user schema, it contains name, email and password
// user can have multiple habits
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;