const { Videogame, Genre }= require("../db");
const axios = require("axios");
const {API_KEY} = process.env;


const getGameById = async (req,res)=>{
    try {
        
        const videogameArr=[];
        const { id } = req.params;
        if(!isNaN(id)){
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const data = response.data
            const videogameById = {
                
                id: data.id,
                name: data.name,
                genres:data.genres,
                description: data.description,
                background_image: data.background_image,
                platforms: data.platforms,
                released: data.released,
                rating:data.rating
            }
        
            videogameArr.push(videogameById);
        }else{
            let videogames = await Videogame.findAll({
                include:{
                    model:Genre,
                    attributes:["name", "id"],
                    through:{
                        attributes:[]
                    }
                }
            });
            let arr = []
            let obj = {
            platform: {
                name:""
            }
            }
            arr.push(obj)
            let videogamesDb= videogames.map((ele)=>{
                arr[0].platform.name= ele.platforms
                return{
                id: ele.id,
                name:ele.name ,
                background_image:ele.background_image ,
                genres: ele.genres.map((e)=>{
                    return {
                        name:e.name,
                        id:e.id
                    }
                }),
                platforms:arr,
                rating:ele.rating,
            }
        })
        videogameArr.push(videogamesDb);
        }
        
        

        
        res.status(200).json(videogameArr[0])
    } 
    catch (error) {
        console.log(error)
        res.status(404).send("Algo salió mal")
    }
    
}

module.exports = {
    getGameById
}