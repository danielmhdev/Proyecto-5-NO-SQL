
const express = require('express');

const Movie = require('../models/Movie');

const router = express.Router();

//GET movies
router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		return res.status(200).json(movies)
	} catch (err) {
		return res.status(500).json(err);
	}
});

//GET id
router.get('/id/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const movie = await Movie.findById(id);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('No movie found by this id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});
//GET title
router.get('/title/:title', async (req, res) => {
	const {title} = req.params;

	try {
		const movieByTitle = await Movie.find({ title });
		return res.status(200).json(movieByTitle);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//GET genre
router.get('/genre/:genre', async (req, res) => {
	const {genre} = req.params;

	try {
		const movieByGenre = await Movie.find({ genre });
		return res.status(200).json(movieByGenre);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//GET year
router.get('/year/:year', async (req, res) => {
	const {year} = req.params;

	try {
		const movieByYear = await Movie.find({ year: {$gt:year} });
		return res.status(200).json(movieByYear);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//POST crear nueva película
router.post('/', async (req, res, next) => {
 try {
      // Crearemos una instancia de movie con los datos enviados
      const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre
      });
  
      // Guardamos la película en la DB
      const createdMovie = await newMovie.save(); //La guardamos en la BD
      return res.status(201).json(createdMovie);
    } catch (error) {
          // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
});

 // PUT para modificar una película
router.put('/:id', async (req, res, next) => { 
    try {
        const { id } = req.params; 
        const movieUpdated = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        
        if (movieUpdated) {
            return res.status(200).json(movieUpdated);
        } else {
            return res.status(404).json('No se ha encontrado la película para actualizar');
        }
    } catch (error) {
        return next(error);
    }
});

//DELETE para borrar una película
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const movieDeleted = await Movie.findByIdAndDelete(id);

        if (!movieDeleted) {
            return res.status(404).json('No se ha encontrado la película para borrar');
        }

        return res.status(200).json('Se ha borrado la película correctamente!');
    } catch (error) {
        return next(error);
    }
});


module.exports = router;