const FriendMessages = require("../models/friendMessages");
const Gameuser = require("../models/user");


const { Router } = require("express");

const router = Router();

router.get('/', function (req, res) {
    return res.render("friends",{
        user: req.user,
    });
});

router.post('/',async (req, res) => {
    const { friendName } =req.body;
    // const username = req.params.username;
    // console.log("id", username);
    console.log(friendName);
    Gameuser.findOne({username:friendName})
    .then(async (user)=>{
        if(user){
            // const friendname = new friendName({
            //     friend: friend
            // });
            // user.friendNames.push(friendname);
            // user.save();
            await FriendMessages.create({
                friendName,
            });
            console.log("Content Save & Website Open ");
        }else{
            alert("Not found this user");
        }
    })
    .catch((err)=>{
        console.log(err);
    });
    return res.render("friends",{
        user: req.user,
    });
});

module.exports = router;









// const express = require("express");
// // const express = require("express");

// const app = express();

// // const router = Router();

// // const path = require("path");
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// // router.use(express.static(path.resolve("./views")));


// // io.on('connection', (socket) => {
// //     console.log('a user connected', socket.id);
// //     socket.on("user-message",message => {
// //         console.log("user message: ", message);
// //         io.emit("message", message);
// //     });
// //     socket.on('disconnect', () => {
// //         console.log('user disconnected', socket.id);
// //     });
// // });

// io.on("connection", (socket) => {
//     socket.on("user-message", (message) => {
//       console.log("back user message: ", message);
//       io.emit("message", message);
//     });
// });

// app.get('/', function (req, res) {
//     return res.render("friends",{
//         user: req.user,
//       });
// });

// module.exports = app;