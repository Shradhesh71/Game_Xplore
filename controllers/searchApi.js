const headers = {
  "Client-ID": process.env.CLIENT_ID_GAME,
  Authorization: `Bearer ${process.env.AUTHORIZATION_GAME}`,
  Accept: "application/json",
};
const gameUrlHome = `${process.env.API_URL}?search=valorant&limit=5&fields=videos.name,videos.video_id,screenshots.image_id,screenshots.url,cover.image_id,cover.animated,websites.url,name,rating,cover.url,url`;

function gameUrlSearch (gamen) {
    `${process.env.API_URL}?search=${gamen}&limit=1&fields=videos.name,videos.video_id,videos.checksum,screenshots.image_id,screenshots.url,themes.name,themes.url,cover.image_id,cover.animated,involved_companies.company.name,similar_games.name,tags,release_dates.date,genres.name,release_dates.region,websites.url,name,rating,cover.url,platforms.name,url,summary,storyline`
};

module.exports = { headers, gameUrlHome,gameUrlSearch};
