const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 5000;
const cookiePaser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

// const Gameuser = require("../models/user");

const userRoute = require("./routes/user");
const GoogleRoute = require("./routes/googleAuth");
const searchRoute = require("./routes/search");
const friendchat = require("./routes/friendchat");
const football = require("./routes/football");
const footplayer = require("./routes/footPlayer");
const forward = require("./routes/forward");

const session = require("express-session");
const passport = require("passport");

// const {connectmongoose, Gameuser} = require("./database.js");
// const {intinalizingPassport} = require("./passport.js");

const axios = require("axios");
// const passportlocalmongoose = require('passport-local-mongoose');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');
// const bodyparser = require('body-parser');
// app.use(bodyparser.urlencoded({extended: true}));
// const _ = require("lodash");
// const {storage,uploadfile} = require("./multer.js");
const multer = require("multer");
// const mongostore = require("connect-mongo");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.warn("connect...");
  })
  .catch((error) => {
    console.log(error);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // set the veiw directory

app.use("/static", express.static("static"));
app.use("/veiws", express.static("veiws")); // for serving static files

app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));

// app.use(session({   //Save login session
//   secret: process.env.GOOGLE_SESSION_SECERT,
//   resave: false,
//   saveUninitialized: true,
//   store: mongostore.create({ mongoUrl:process.env.MONGO_URL,collectionName: "sessions" }),
//   cookie:{
//     maxAge: 1000*60*60 // 1 hours
//   }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// userSchema.plugin(passportlocalmongoose);  // to hash and set a password
// userSchema.plugin(findOrCreate);

// intinalizingPassport(passport);

const countrycodes = [];

// const uploadDirectory = './uploads';
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory);
// };
const headers = {
  "Client-ID": process.env.CLIENT_ID_GAME,
  Authorization: `Bearer ${process.env.AUTHORIZATION_GAME}`,
  Accept: "application/json",
};
const gameUrl = `${process.env.API_URL}?search=valorant&limit=5&fields=videos.name,videos.video_id,screenshots.image_id,screenshots.url,cover.image_id,cover.animated,websites.url,name,rating,cover.url,url`;

app.get("/", async (req, res) => {
  await axios
    .get(gameUrl, {
      headers,
    })
    .then((res) => {
      //   console.log(res.data);   1.websites[0].url
      gameData = res.data;
      console.log("----------------------------------------------------");
      // console.log(gameData[0].videos[0].video_id);
      // console.log(gameData[1].videos[0].video_id);//  1.videos[0].video_id
      // console.log(gameData[2].videos[0].video_id);
      // console.log(gameData[1].websites[0].url);
    })
    .catch((err) => console.error(err));

  res.render("main_F", {
    user: req.user,
    gameName0: gameData[0].name,
    gameName1: gameData[1].name,
    gameName2: gameData[2].name,
    // gameName3: gameData[3].name,
    gameweb0: gameData[0].websites[0].url,
    gameweb1: gameData[1].websites[0].url,
    gameweb2: gameData[2].websites[0].url,
    // gameweb3:gameData[3].websites[0].url,
    gameyou0: gameData[0].videos[0].video_id,
    gameyou1: gameData[1].videos[0].video_id,
    gameyou2: gameData[2].videos[0].video_id,
    // gameyou3:gameData[3].videos[0].video_id,
  });
  console.log("Sent: Main_F Page");
});

app.get("/error", async (req, res) => {
  res.render("404");
});

// app.get("/home",(req, res) =>{
//   if(req.isAuthenticated()) {
//     res.render("home",{gxidname:"Shivam"});
//   }else{
//     res.render("login");
//   }
//   console.log(req.session);
//   console.log(req.user);
// });

app.use("/user", userRoute);
app.use("/auth", GoogleRoute);
app.use("/search", searchRoute);
app.use("/friend", friendchat);
app.use("/football", football);
app.use("/footplayer", footplayer);
app.use("/forward", forward);

// app.get('/login',(req, res) =>{
//     res.status(200).render("login")
//     console.log("Sent: Login page");
// });

// app.get('/user/register',(req,res) =>{
//   res.status(200).render("register");
//   console.log("Sent: Register Page");
// });

// app.get('/register_last',(req,res) =>{
// //   if(countrycodes.length==0){
// //     res.redirect("/register");
// //     console.log("Sent: Register_last to Register Page");
// //   }else{
// //     res.status(200).render("register2");
// //     console.log("Sent: Register_last_Page");
// //   }
// // });

// app.get("/avatar/:gxid",(req, res) =>{
//   const gxid = _.capitalize(req.params.gxid);
//   console.log("Got avatar gxid: " + gxid);
//   res.render("avatar",{"gxid": gxid});
// });

app.get("/studios", (req, res) => {
  res.render("studios");
  console.log("Sent: Studios_Page");
});

app.get("/useralready", (req, res) => {
  res.render("userAlready");
});

// app.get("/Game",(req,res) =>{
//   res.render("about_game.ejs");
// });
const apiKey = process.env.GAINT_API;

// app.post("/game", async (req, res) => {
//   console.log(req.body);
//   try {
//     const gameId = req.body.gamen;
//     const response = await axios.get(
//       `https://www.giantbomb.com/api/game/${gameId}/?api_key=${apiKey}&format=json`
//     );
//     // console.log(response);
//     const gameData = response.data.results;
//     // const params = {gametitle:gameData.name,
//     //                 gamemainimage:gameData.image.medium_url,
//     //                 gamerelease:gameData.original_release_date,
//     //                 gamedeck:gameData.deck,
//     //                 gamedisp:gameData.description,
//     //                 gamesimilar:gameData.similar_games[0].name,
//     //                 gamesemiurl:gameData.similar_games[0].site_detail_url
//     //               }
//     // res.json(gameInfo);
//     res.render("about_game", {
//       user: req.user,
//       gametitle: gameData.name,
//       gamemainimage: gameData.image.medium_url,
//       gamerelease: gameData.original_release_date,
//       gamedeck: gameData.deck,
//       gamedisp: gameData.description,
//       gamesimilar: gameData.similar_games[0].name,
//       gamesemiurl: gameData.similar_games[0].site_detail_url,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/register", (req, res) => {
  countrycodes.push(req.body.country);
  console.log("Request country Code: ", req.body.country);
  res.status(200).redirect("/user/signup");
  console.log("Sent: Register_1 Page Post Request");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post("/register_last", async (req, res) => {
  // console.log(req.body.email);
  // const newUser = await Gameuser.findOne({username:req.body.username});

  // if(newUser) return res.status(400).redirect("/useralready");

  //  const newUser = await Gameuser.create(req.body);
  const user = new Gameuser({
    email: req.body.username,
    password: req.body.password,
    gxidnames: req.body.name,
  });
  await user
    .save()
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).redirect("/home");
  console.log("Sent: Register_last Page Post Request");
});

// app.post('/login', passport.authenticate("local", { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/');
// });

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    fs.opendir("./uploads", (err) => {
      if (err) {
        console.log(err.stack);
      } else {
        callback(null, "./uploads");
      }
      console.log("Finished uploading!");
    });
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    ); // for file extension
  },
});
app.post("/avatar", (req, res) => {
  // const profilePicture = req.body.avatar;
  // console.log(profilePicture);
  //   const profile = new Item({
  //     profilePicture: profilePicture
  // });
  console.log(req.body);
  // res.send(req.body);
  // const user = await Gameuser.findOne({username:req.body.username})
  // .then((user)=>{
  //   user.profiles.push(profile);
  //   user.save();
  //   res.redirect("/home");
  // })
  // .catch((err)=>{
  //   res.status(500).send('Error uploading profile picture.');
  // })

  // try {
  //   ()=>{

  //   }
  //   await newProfile.save();
  //   res.status(201).send('Profile picture uploaded successfully.');
  // } catch (error) {
  //   res.status(500).send('Error uploading profile picture.');
  // }
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      // this function is used to filter upload by extension
      var ext = path.extname(file.originalname + ".jpg");
      if (
        ext !== ".png" &&
        ext !== ".jpg" &&
        ext !== ".gif" &&
        ext !== ".jpeg"
      ) {
        return callback(new Error("Only images are allowed"));
      }
      callback(null, true);
    },
  }).single("userFile");
  upload(req, res, (err) => {
    if (err) {
      return res.end("Error uploading file.");
    }
    // res.end("File is uploaded");
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
