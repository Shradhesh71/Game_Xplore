const { Router } = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const router = Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(cors());

const headers = {
  "X-AUTH-TOKEN": `0dd0fe1c-a22b-4944-873b-773747e2ce27`,
  Accept: "image/png",
};

router.get("/", async function (req, res) {
  const url = "https://futdb.app/api/players/";

  await axios
    .get(url, {
      headers,
    })
    .then((res) => {
      //   console.log(res.data);
      gameData = res.data;
      console.log("----------------------------------------------------");
      console.log(gameData.items[0].name);
    })
    .catch((err) => console.error(err));
//items[1].name
  return res.render("football", {
    user: req.user,
    data: gameData.items
  });
});

module.exports = router;
