const { Router } = require('express');
const { getAllGames } = require('../controllers/getAllGames');
const { getAllGenres } = require('../controllers/getAllGenres');
const { getGameById } = require('../controllers/getGameById');
const { postNewGame } = require('../controllers/postNewGame');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.get('/videogames',getAllGames); 

mainRouter.get('/videogames/:id', getGameById);

mainRouter.post('/videogames', postNewGame);

mainRouter.get('/genres',getAllGenres );

module.exports = mainRouter;