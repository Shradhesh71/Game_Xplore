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

const FriendMessages = model("friendMessages", userMessageSchema);


module.exports = {FriendMessages};