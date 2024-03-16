const mongoose = require('mongoose');
const passportlocalmongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
// const {userSchema} = require("./database.js");


// mongoose.connect(process.env.MONGO_URL)
//     .then(()=>{
//         console.warn("connect...");
//     })
//     .catch((error)=>{
//         console.log(error);
//     });


// const userSchema =  new mongoose.Schema({
//     email:String,
//     password:String,
//     googleId:String,
//     countrycode:String,
//     facebookId:String,
//     gxidnames:String,
//     profilePicture: String,
//     usernames:String,
//     name:String,
// });

exports.plugin =() =>{
    userSchema.plugin(passportlocalmongoose);  // to hash and set a password
    userSchema.plugin(findOrCreate);
};

// exports.Gameuser = mongoose.model('Gameusers',userSchema);