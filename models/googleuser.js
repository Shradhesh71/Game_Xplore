const {Schema, model} = require("mongoose");

const friendName = {
    name:String
};

const userSchema =  new Schema(
    {
        accesstoken:{
            type: 'string',
        },
        dob:{
            type: String,
            default:"dd/mm/yy",
        },
        username:{
            type: String,
            required: true,
            default:"user@1234",
        },
        role:{
            type: String,
            enum: ["USER","ADMIN"],
            default:"USER"
        },
        profilePicture: {
            type: String,
            default:"/images/default.png",
        },
        friendNames:{
            type: String,
            friend:[friendName],
        },
    },
    { timestamps: true }
);

const Googleuser = model("googleuser", userSchema);

module.exports = Googleuser;