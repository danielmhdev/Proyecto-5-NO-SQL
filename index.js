const express = require('express');
const {connect} = require('./utils/db')
const movieRoutes = require('./routes/movie.routes');
const cinemaRoutes = require('./routes/cinema.routes');

connect();

const PORT = 3000;
const server = express();


// Permite leer el cuerpo de las peticiones en formato JSON
server.use(express.json()); 
server.use(express.urlencoded({ extended: false }));

//Rutas
server.use('/movies', movieRoutes);
server.use('/cinemas', cinemaRoutes)

//Manejador de rutas no especificadas
server.use((req, res, next) => {
	const error = new Error('Route not found'); 
	error.status = 404;
	next(error); 
  });

//Manejador de errores
server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});


server.listen(PORT, () => {
  console.log(`Server running in <http://localhost>:${PORT}`);
});