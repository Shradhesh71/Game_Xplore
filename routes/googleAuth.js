const { Router } = require("express");
const Googleuser = require("../models/googleuser");
const { createTokenForGoogleuser } = require("../services/authentication");

const router = Router();

const session = require("express-session");
const passport = require("passport");

router.use(
  session({
    //Save login session
    secret: process.env.GOOGLE_SESSION_SECERT,
    resave: false,
    saveUninitialized: true,
  }),
);

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECERT,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async function (req, res, accessToken, refreshToken, profile, done) {
      console.log("accessToken: ", accessToken);
      console.log("refreshToken: ", refreshToken);
      console.log(profile);
      const { given_name, family_name, picture } = profile._json;
      const { access_token } = refreshToken;
      await Googleuser.create({
        username: `${family_name}@5987`,
        profilePicture: picture,
        accesstoken: access_token,
      });
      var token = createTokenForGoogleuser(given_name);
      // res.cookie("token", token)
      return done(null, token);
    },
  ),
);

passport.serializeUser(function (user, done) {
  console.log("done from passport: ", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/login" }),
  function (req, res) {
    res.redirect("/");
  },
);

module.exports = router;
