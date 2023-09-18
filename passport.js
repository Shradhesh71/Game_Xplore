const LocalStrategy = require("passport-local").Strategy;   
const {Gameuser} = require("./database.js");
const bcrypt = require('bcryptjs');

exports.intinalizingPassport = (passport) => {
    passport.use(new LocalStrategy(
        async (username, password, done) =>{
        //     Gameuser.findOne({ username: username }, (err, user) =>{
        //     if (err) { return done(err); }
        //     if (!user) { return done(null, false); }
        //     if (!user.verifyPassword(password)) { return done(null, false); }
        //     return done(null, user);
        //   });
          try {
            const user = await Gameuser.findOne({ username: username });
      
            if (!user) {
              return done(null, false, { message: 'User not found' });
            }
      
            const validate = await user.isValidPassword(password);
      
            if (!validate) {
              return done(null, false, { message: 'Wrong Password' });
            }
      
            return done(null, user, { message: 'Logged in Successfully' });
          } catch (error) {
            return done(error);
          }
        }
      ));

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser(async (id,done)=>{
        try{
            const user = await Gameuser.findById(id);
            done(null,user);
        }catch(error){
            done(error,false);
        }
        
    });
};

exports.isAuthenticated = (req, res, next)=>{
    if (req.user)  return next();
    console.log("not authenticated open login")
    res.redirect("/login");
}