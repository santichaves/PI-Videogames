const { default: axios } = require("axios");
require("dotenv").config();

const controllerGames = async () => {
    try {
      let links = [];
      let apis = [];
      for (let i = 1; i <= 5; i++) {
        links.push(
          `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`
        );
      }
  
      apis = links.map((link) => {
        return axios
          .get(link)
          .then((data) => data.data)
          .then((data) => data.results)
          .then((data) => {
            return data.map((game) => ({
              id: game.id,
              name: game.name,
              background_image: game.background_image,
              genres: game.genres.map((genre) => genre.name),
              platforms: game.platforms.map((element) => element.platform.name),
              rating: game.rating,
            }));
          });
      });
      let allGames = await Promise.all(apis);
      return allGames.flat();
      // .then((data) => [...data, ...databaseVideoGames])
      // .catch((error) => new Error(error));
    } catch (error) {
      return [];
    }
  };
module.exports = {
    controllerGames
}