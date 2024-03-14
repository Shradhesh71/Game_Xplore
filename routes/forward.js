const Gameuser = require("../models/user");
const { Router } = require("express");
// const { main } = require("./nodemailer");

const router = Router();

router.get("/forwordPassword/", async (req, res) => {
  // const user = await Gameuser.find({ _id: req.params.id });
  // console.log(user);
  // console.log("user");
  return res.render("forwordPass", {
    // user: req.user,
  });
});

router.get("/conform", async (req, res) => {
  return res.render("ConformPassword");
});

router.post("/forwardPass", async (req, res) => {
  // console.log(req.params.id);
  console.log(req.body);
  const { email } = req.body;
  //   const OTP = setTimeout(Math.floor(Math.random() * 900000) + 100000, 5000);
  const OTP = Math.floor(Math.random() * 900000) + 100000;
  console.log(`OTP: ${OTP}`);
  // await main(email, OTP);
  return res.render("OTPverify", {
    email: email,
  });
});

module.exports = router;
