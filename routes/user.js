const Gameuser = require("../models/user");
const { Router } = require("express");

const router = Router();

router.get("/login", (req, res) => {
  console.log("Sent: Login page");
  return res.render("login");
});

router.get("/register", (req, res) => {
  return res.render("register");
});

router.get("/signup", (req, res) => {
  console.log("Sent: Register_last_Page");
  return res.render("register2");
});

router.get("/avatar/:id", async (req, res) => {
  try {
    const user = await Gameuser.find({ _id: req.params.id });
    // console.log(`user: ${user}`);
    return res.render("avatar", {
      user: req.user,
    });
  } catch (e) {
    return res.redirect("/error");
    console.log(e);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.get("/profile/:id", async (req, res) => {
  try {
    const user = await Gameuser.find({ _id: req.params.id });
    // console.log(`profile ${user}`);
    return res.render("profile", {
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/error");
  }
});

router.post("/login", async (req, res) => {
  console.log("login request", req.body);
  const { email, password } = req.body;
  try {
    const token = await Gameuser.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect Email or Password",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  await Gameuser.create({
    username,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/avatars/:id", async (req, res) => {
  try {
    await Gameuser.findOneAndUpdate({ _id: req.params.id }, {});
    console.log("Updated avatar")
  } catch (e) {
    console.log(e);
    return res.redirect("/error");
  }
});

router.post("/avatard/:id", async (req, res) => {
  try {
    const { profilePicture } = req.body;
    // console.log(req.body);
    await Gameuser.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { profilePicture: profilePicture } },
    )
      .then(() => {
        console.warn("Changed...");
      })
      .catch((error) => {
        console.log("not changed", error);
      });
    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.redirect("/error");
  }
});

router.post("/dob/:id", async (req, res) => {
  try {
    const { dateOfBirth } = req.body;
    console.log(req.body);
    Gameuser.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { dob: dateOfBirth } },
    )
      .then(() => {
        console.warn("Changed...");
      })
      .catch((error) => {
        console.log("not changed", error);
      });
    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.redirect("/error");
  }
});

module.exports = router;
