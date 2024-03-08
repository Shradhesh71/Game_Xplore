// const { Router } = require("express");
// const axios = require("axios");
// const Gameuser = require("../models/user");

// const router = Router();

// const apiKey = "227ead613574b24dba4bbad59eb633dabdc43a2b";

// router.post("/game", async (req, res) => {
//   const { gamen } = req.body;

//   try {
//     const gameId = gamen;
//     const response = await axios.get(
//       `https://www.giantbomb.com/api/game/${gameId}/?api_key=${apiKey}&format=json`
//     );
//     const gameData = response.data.results;
//     return res.render("about_game", {
//       user: req.user,
//       gametitle: gameData.name,
//       gamemainimage: gameData.image.medium_url,
//       gamerelease: gameData.original_release_date,
//       gamedeck: gameData.deck,
//       gamedisp: gameData.description,
//       gamesimilar: gameData.similar_games[0].name,
//       gamesemiurl: gameData.similar_games[0].site_detail_url,
//     });
//   } catch (error) {
//     console.log("error: ", error);
//     return res.redirect("/error");
//   }
// });

// module.exports = router;
