const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 8080;
const {connectmongoose, Gameuser} = require("./database.js");
const {intinalizingPassport} = require("./passport.js");
const session = require("express-session");
const passport = require('passport');
const axios = require("axios");
const passportlocalmongoose = require('passport-local-mongoose');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');
// const bodyparser = require('body-parser');
// app.use(bodyparser.urlencoded({extended: true}));
const _ = require("lodash");
// const {storage,uploadfile} = require("./multer.js");
const multer = require('multer');
const mongostore = require("connect-mongo");

connectmongoose();

app.use('/static',express.static('static'));
app.use('/veiws',express.static('veiws'));// for serving static files
app.use(express.urlencoded({extended: true}));  // help to form data to this file

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views')); // set the veiw directory

app.use(session({   //Save login session
  secret: "ShradheshJain!!!",
  resave: false,
  saveUninitialized: true,
  store: mongostore.create({ mongoUrl:"mongodb+srv://shradesh71:newone71@cluster0.4tegtua.mongodb.net/gameusers?retryWrites=true",collectionName: "sessions" }),
  cookie:{ 
    maxAge: 1000*60*60 // 1 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

intinalizingPassport(passport);

const countrycodes =[];
// const gxidnames=[];

// plugin();

const gxidnames ="";

const uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
};

app.get('/',(req, res) =>{
    res.render("main_F");
    console.log("Sent: Main_F Page");
});

app.get("/home",(req, res) =>{
  // if(req.isAuthenticated()) {
    res.render("home",{gxidname:"Shivam"});
  // }else{
    // res.render("login");
  // }
  // res.render("home");
  console.log(req.session);
  console.log(req.user);
});

app.get('/login',(req, res) =>{
    res.status(200).render("login")
    console.log("Sent: Login page");
});

app.get('/register',(req,res) =>{
  res.status(200).render("register");
  console.log("Sent: Register Page");
});

app.get('/register_last',(req,res) =>{
  if(countrycodes.length==0){
    res.redirect("/register");
    console.log("Sent: Register_last to Register Page");
  }else{
    res.status(200).render("register2");
    console.log("Sent: Register_last_Page");
  }
});

app.get("/avatar/:gxid",(req, res) =>{
  const gxid = _.capitalize(req.params.gxid);
  console.log("Got avatar gxid: " + gxid);
  res.render("avatar",{"gxid": gxid});
});

app.get("/studios",(req,res) =>{
  res.render("studios");
  console.log("Sent: Studios_Page");
});

app.get("/useralready",(req,res) =>{
  res.render("userAlready");
});

// app.get("/Game",(req,res) =>{
//   res.render("about_game.ejs");
// });
const apiKey = '227ead613574b24dba4bbad59eb633dabdc43a2b';

app.post("/gameWebpage",async (req,res) =>{
  console.log(req.body);
  try {
    const gameId = req.body.gamen;
    const response = await axios.get(
      `https://www.giantbomb.com/api/game/${gameId}/?api_key=${apiKey}&format=json`
    );
    const gameData = response.data.results;
    const params = {gametitle:gameData.name,
                    gamemainimage:gameData.image.medium_url,
                    gamerelease:gameData.original_release_date,
                    gamedeck:gameData.deck,
                    gamedisp:gameData.description,
                    gamesimilar:gameData.similar_games[0].name,
                    gamesemiurl:gameData.similar_games[0].site_detail_url
                  }
    // res.json(gameInfo);
  res.render("about_game.ejs",params);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/register',  (req, res) =>{
    countrycodes.push(req.body.country);
    console.log('Request country Code: ',req.body.country);
    res.status(200).redirect("/register_last");
    console.log("Sent: Register_1 Page Post Request");

});

app.get("/logout",(req, res) => {
  req.logout();
  req.redirect("/"); 
});

app.post('/register_last',async (req, res) =>{
  // console.log(req.body.email);
    // const newUser = await Gameuser.findOne({username:req.body.username});

    // if(newUser) return res.status(400).redirect("/useralready");

    //  const newUser = await Gameuser.create(req.body);
    const user = new Gameuser({
      email: req.body.username,
      password: req.body.password,
      gxidnames: req.body.name
    });
    user.save()
    .then(user=>{
      console.log(user);
    }).catch(err=>{
      console.log(err);
    });
    res.status(201).redirect("/home");
    console.log("Sent: Register_last Page Post Request");
})

app.post("/login",passport.authenticate("local",{
  successRedirect:"home",
}));

const storage = multer.diskStorage({
  destination:  (req, file, callback) => {
      fs.opendir('./uploads', (err) => {  
          if(err) {
              console.log(err.stack)
          } else {
              callback(null, './uploads');
          }
          console.log('Finished uploading!');
      })
  },
  filename: (req, file, callback) =>{
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // for file extension
  }
});
app.post("/avatar",(req,res)=>{
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
  var upload = multer({ storage : storage,
    fileFilter: (req, file, callback) =>{    // this function is used to filter upload by extension
        var ext = path.extname(file.originalname+".jpg");
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
}).single('userFile');
upload(req,res,(err) =>{
    if(err) {
        return res.end("Error uploading file.");
    }
    // res.end("File is uploaded");
    res.redirect("/home");
});

});

app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
});