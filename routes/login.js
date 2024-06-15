const Gameuser = require("../models/user");
const { Router } = require("express");
const { main } = require("./nodemailer");

const router = Router();

router.get("/", (req, res) => {
  console.log("Sent: Login page");
  return res.render("login");
});

router.post("/", async (req, res) => {
  console.log("login request", req.body);
  const { email, password } = req.body;
  try {
    const token = await Gameuser.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render(
      "login",
      {
        error: "Incorrect Email or Password",
      },
      console.log(error),
    );
  }
});

module.exports = router;
