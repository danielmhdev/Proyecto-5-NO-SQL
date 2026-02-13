
const express = require('express');

const Movie = require('../models/Movie');

const router = express.Router();

// GET todas las películas
router.get('/', async (req, res, next) => { 
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies);
    } catch (error) {
        return next(error); 
    }
});

// GET id
router.get('/id/:id', async (req, res, next) => {
    const { id } = req.params; 
    try {
        const movie = await Movie.findById(id);
        if (movie) {
            return res.status(200).json(movie);
        } else {
            const err = new Error('No se encuentra película por esta id');
            err.status = 404;
            return next(err);
        }
    } catch (error) {
        return next(error);
    }
});

// GET title
router.get('/title/:title', async (req, res, next) => {
    const { title } = req.params;
    try {
        const moviesByTitle = await Movie.find({ title });
        return res.status(200).json(moviesByTitle);
    } catch (error) {
        return next(error); 
    }
});

// GET genre
router.get('/genre/:genre', async (req, res, next) => {
    const { genre } = req.params;
    try {
        const movieByGenre = await Movie.find({ genre });
        return res.status(200).json(movieByGenre);
    } catch (error) {
        return next(error);
    }
});

//GET year
router.get('/year/:year', async (req, res, next) => {
    const { year } = req.params;
    try {
        const movieByYear = await Movie.find({ year: { $gt: year } });
        return res.status(200).json(movieByYear);
    } catch (error) {
        return next(error);
    }
});

// POST crear nueva película
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

// DELETE para borrar una película
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