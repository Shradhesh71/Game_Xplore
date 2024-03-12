const {Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto");
const { createTokenForUser } = require("../services/authentication");

// const friendName = {
//     name:String
// }; 

const userSchema =  new Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        dob:{
            type: String,
            default:"dd/mm/yy",
        },
        salt:{
            type: String,
            // required: true,
        },
        password:{
            type: String,
            required: true,
        },
        // countrycode:String,
        username:{
            type: String,
            required: true,
            unique: true,
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
        // friendNames:{
        //     type: String,
        //     // friend:[friendName],
        // }
    },
    { timestamps: true }
);

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashpassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashpassword;
    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("Couldn't find User");
    
    const providePassword = createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

    if(user.password !== providePassword)
        throw new Error("Passwords do not match");

    const token = createTokenForUser(user);
    return token;
});

const Gameuser = model("user", userSchema);

module.exports = Gameuser;