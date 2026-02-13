const express = require('express');

const Cinema = require('../models/Cinema');

const router = express.Router();

// GET todos los cines
router.get('/', async (req, res, next) => {
    try {
        const cinemas = await Cinema.find();
        return res.status(200).json(cinemas);
    } catch (error) {
        return next(error);
    }
});

// GET id 
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const cinema = await Cinema.findById(id);
        if (cinema) {
            return res.status(200).json(cinema);
        } else {
            const err = new Error('Cine no encontrado');
            err.status = 404;
            return next(err);
        }
    } catch (error) {
        return next(error);
    }
});

// GET localización 
router.get('/location/:location', async (req, res, next) => {
    const { location } = req.params;
    try {
        const cinemasByLocation = await Cinema.find({ location });
        return res.status(200).json(cinemasByLocation);
    } catch (error) {
        return next(error);
    }
});

// POST crear nuevo cine
router.post('/', async (req, res, next) => {
    try {
       const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: req.body.movies
        });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (error) {
        next(error);
    }
});

// PUT añadir una película a un cine
router.put('/add-movie', async (req, res, next) => {
    try {
        const { cinemaId, movieId } = req.body; // Recibimos ambos IDs por el body
        
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push: { movies: movieId } },
            { new: true }
        );

        if (updatedCinema) {
            return res.status(200).json(updatedCinema);
        } else {
            return res.status(404).json('No se ha encontrado el cine');
        }
    } catch (error) {
        return next(error);
    }
});

// PUT Modificar un cine
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const cinemaUpdated = await Cinema.findByIdAndUpdate(id, req.body, { new: true });

        if (cinemaUpdated) {
            return res.status(200).json(cinemaUpdated);
        } else {
            return res.status(404).json('No se ha encontrado cine para actualizar s');
        }
    } catch (error) {
        return next(error);
    }
});



// DELETE Borrar un cine
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const cinemaDeleted = await Cinema.findByIdAndDelete(id);

        if (!cinemaDeleted) {
            return res.status(404).json('Cine no encontrado para borrar');
        } else {
            return res.status(200).json('Cine borrado con éxito');
        }
    } catch (error) {
        return next(error);
    }
});



module.exports = router;