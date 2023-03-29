const { Videogame, Genre }= require("../db");
const {controllerGames} = require ("./controllerGames")
const { default: axios } = require("axios");

require("dotenv").config();


const getAllGames = async (req,res)=>{
    const {name} = req.query;
    if(!name){
    try {
        // Obtener los videojuegos de la base de datos
        let videogames = await Videogame.findAll({
            include:{
                model:Genre,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
        });
        let videogamesDb= videogames.map((ele)=>{
            return{
            id: ele.id,
			name:ele.name ,
			background_image:ele.background_image ,
			genres: ele.genres.map((e)=>{
                return e.name
            }),
			platforms:ele.platforms, 
			rating:ele.rating,
		}
        })
        const gamesforApi = await controllerGames()
        videogamesDb = [...videogamesDb,...gamesforApi];
        res.status(200).json({videogamesDb})
    } catch (error) {
        console.log(error)
        res.status(404).send('Error al obtener los videojuegos');
    }}
    else{
        try {
            // Obtener los videojuegos que coincidan con el nombre especificado
            const response = await axios(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}`);
           
            const data = response.data;
            const juego= data.results.map((game) => ({
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                genres: game.genres.map((genre) => genre.name),
                platforms: game.platforms.map((element) => element.platform.name),
                rating: game.rating,
              }));

            if (!data){
                res.status(404).send("No se encontraron resultados");
            }
            else{
                res.status(200).json(juego)
            } 
        }
        catch (error) {
            res.status(403).json({error:error.message})
            
        }
    }
}

module.exports={
    getAllGames
}