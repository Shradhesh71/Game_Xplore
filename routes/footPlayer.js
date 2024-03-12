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

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const url = `https://futdb.app/api/players/${id}/image`;

  await axios
    .get(url, {
      headers,
    })
    .then((res) => {
        // var rawResponse = res.data; // truncated for example
        gamedata = res.data
        // convert to Base64
        // var b64Response = btoa(rawResponse);

        // create an image
        // var outputImg = document.createElement('img');
        // outputImg.src = 'data:image/png;base64,'+b64Response;

        // append it to your page
        // document.body.appendChild(outputImg);

      console.log("----------------------------------------------------");
      //   console.log(gameData.items[0].name);
    })
    .catch((err) => console.error(err));
  return res.render("footplayer", {
    user: req.user,
    data: gamedata,
  });
});

module.exports = router;
