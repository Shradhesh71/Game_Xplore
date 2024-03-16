const { Router } = require("express");
const router = Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();

router.use(bodyParser.json());
router.use(cors());

router.post("/game", async (req, res) => {
  console.log(req.body);
  const { gamen } = req.body;
  const token = process.env.AUTHORIZATION_GAME;
  const headers = {
    "Client-ID": process.env.CLIENT_ID_GAME,
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
  let gameData;

  const gameUrl = `${process.env.API_URL}?search=${gamen}&limit=1&fields=videos.name,videos.video_id,videos.checksum,screenshots.image_id,screenshots.url,themes.name,themes.url,cover.image_id,cover.animated,involved_companies.company.name,similar_games.name,tags,release_dates.date,genres.name,release_dates.region,websites.url,name,rating,cover.url,platforms.name,url,summary,storyline`;
  await axios
    .get(gameUrl, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      gameData = res.data;
      console.log("----------------------------------------------------");
      console.log("Video name\n");
      // console.log(gameData[0]);
    })
    .catch((err) => console.error(err));
  // console.log(gameData[0].similar_games);
  return res.render("about_game", {
    user: req.user,
    gametitle: gameData[0].name,
    gamemainimage: gameData[0].cover.url,
    // gamerelease: gameData[0].release_dates[0].date,
    gamerate: gameData[0].rating,
    gamedisp: gameData[0].summary,
    similar_games: gameData[0].similar_games,
    theme: gameData[0].themes,
    download: gameData[0].websites,
    company: gameData[0].involved_companies,
    storyline: gameData[0].storyline,
    screenshots: gameData[0].screenshots,
    videos: gameData[0].videos,
  });
});

module.exports = router;
