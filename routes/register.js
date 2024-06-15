const Gameuser = require("../models/user");
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  return res.render("register");
});

router.get("/signup", (req, res) => {
  console.log("Sent: Register_last_Page");
  return res.render("register2");
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await Gameuser.findOne({ email });

  if (user) {
    return res.json({ error: "User Already Exists" }, { status: 400 });
  }
  await Gameuser.create({
    username,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = router;
