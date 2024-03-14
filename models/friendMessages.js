const {Schema, model} = require("mongoose");

const messages =new Schema({
    message:{
        type:String
    }
    },
    { timestamps: true }
);

const userMessageSchema = new Schema(
    {
        friendName:{
            type: String,
            unique: true,
        },
        message:{
            type: String,
            items:[messages],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

userMessageSchema.static("friendToken", async function(friendName,message){
    const user = await this.findOne({friendName,message});
    if(!user) throw new Error("Couldn't find User");
    

    const token = createTokenForUser(user);
    return token;
});

const FriendMessages = model("friendMessages", userMessageSchema);


module.exports = FriendMessages;