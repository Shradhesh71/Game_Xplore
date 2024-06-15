const Gameuser = require("../models/user");
const { Router } = require("express");

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await Gameuser.find({ _id: req.params.id });
    return res.render("profile", {
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/error");
  }
});

module.exports = router;
