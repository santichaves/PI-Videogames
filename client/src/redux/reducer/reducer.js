import {
  GET_ALL_VIDEOGAMES, FIND_VIDEOGAMES, VIDEOGAME_DETAIL, GET_GENRES,
  FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_RATING
} from "../actions/action_type"


let inicialState = {
  videogames: [],
  videogamesAux: [],
  detail: {},
  detailAux: {},
  filtered:[],
  genres: [],
  plataforms: {},
  errorFilter: false
};

const reducer = (state = inicialState, { type, payload }) => {
  let videogamesAux = state.videogamesAux;
  let videogames = state.videogames;


  switch (type) {

    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: payload.videogamesDb,
        videogamesAux: payload.videogamesDb,
      };


    case FIND_VIDEOGAMES:
      return {
        ...state,
        videogamesAux: payload,
      };
      

    case VIDEOGAME_DETAIL: return {
      ...state,
      detail: payload,
    };

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };


      case FILTER_BY_GENRE:
        console.log(payload,'MIA')
        let filterGenresVideogames = videogames;
        if (payload.length > 0) {
          filterGenresVideogames = videogamesAux.filter((videogame) => {
            const noIncludesGenre = [];
            payload.forEach((genre) => {
              if (!videogame.genres.includes(genre)) {
                noIncludesGenre.push(genre);
              }
            });
            return !noIncludesGenre.length;
          });
        }
        return {
          ...state,
          videogamesAux: filterGenresVideogames,
        };


      



            case FILTER_BY_ORIGIN:
      const filterVideogame = videogamesAux.filter((game) => {
        if (payload === "db") {
          return typeof game.id === "string";
        }
        if (payload === "api") {
          return typeof game.id === "number";
        }
        return true;
      });
      return {
        ...state,
        videogamesAux: filterVideogame,
      };
    case ORDER_BY_NAME:
      const orderNameVideogames = videogamesAux.sort((gameA, gameB) => {
        if (payload === "asc") {
          return gameA.name.toLowerCase() < gameB.name.toLowerCase() ? -1 : 0;
        }
        return gameB.name.toLowerCase() < gameA.name.toLowerCase() ? -1 : 0;
      });
      console.log(orderNameVideogames)
      return {
        ...state,
        videogamesAux: orderNameVideogames,
      };

    case ORDER_BY_RATING:
      const orderRatingVideogames = videogamesAux.sort((gameA, gameB) => {
        if (payload === "up") {
          return gameB.rating - gameA.rating;
        }
        return gameA.rating - gameB.rating;
      });
      return {
        ...state,
        videogamesAux: orderRatingVideogames,
      };
    default:
      return {
        ...state,
      };
  }
};
            
export default reducer;
























