const Gameuser = require("../models/user");
const { Router } = require("express");
// const { main } = require("./nodemailer");

const router = Router();

router.get("/avatar/:id", async (req, res) => {
  try {
    const user = await Gameuser.find({ _id: req.params.id });
    return res.render("avatar", {
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/error");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/avatars/:id", async (req, res) => {
  try {
    await Gameuser.findOneAndUpdate({ _id: req.params.id }, {});
    console.log("Updated avatar");
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
