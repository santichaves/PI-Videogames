const { Videogame,Genre } = require ("../db");

const postNewGame = async(req,res)=>{
    
    try {
        const { name, description, released, rating, platforms, genres,background_image } = req.body;
        if (!name || !description || !released || !rating || !platforms || !genres || !background_image  )  {
            res.status(400).json({ message: 'Debe ingresar todos los datos necesarios' });
            
        }else{
            console.log(genres)
            // Crear el videojuego en la base de datos
            const newVideoGame = await Videogame.create({
                name,
                description,
                released,
                rating,
                platforms,
                background_image
            });
             console.log(newVideoGame)
               let genreId= await 
            genres.map((ele)=>{
                newVideoGame.setGenres(ele)
            })
            // Obtener los géneros a partir de sus nombres y relacionarlos con el videojuego
            // const genreNames = genres.split(',');
            // const foundGenres = await Promise.all(genreNames.map(name => Genre.findOne({ where: { name } })));
            // await newVideoGame.addGenres(foundGenres.filter(genre => genre)); // Filtrar géneros que no existen en la base de datos
            
            res.status(201).json(newVideoGame);
        }
    }
    catch (error) {
        console.log(error)
        res.status(404).json({ message: 'Ocurrió un error al crear el videojuego' });
    }
}


module.exports = {
    postNewGame
}