const { Genre } = require("../db")
require("dotenv").config();
const axios = require("axios");

const getAllGenres = async(req, res)=>{
    try {
        let allGenres = [];
    
        // Verificar si hay géneros en la base de datos
        const dbGenres = await Genre.findAll();
    
        if (dbGenres.length > 0) {
            allGenres = dbGenres.map(genre => {
                return{
                    name:genre.name,
                    id: genre.id
                }
            });
            
        } else {
        // Si no hay géneros en la base de datos, obtenerlos de la API y guardarlos en la base de datos
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
        allGenres = response.data.results.map(genre => {
            return{
                name:genre.name,
                id: genre.id
            }
            
        });
        

        allGenres.map(genre => Genre.create({ name:genre.name, id:genre.id }))
        }
    
        return res.status(200).json(allGenres);
    } catch (error) {
        
        res.status(400).json({ message: 'Ocurrió un error al obtener los géneros' });
    }
}

module.exports = {
    getAllGenres
}