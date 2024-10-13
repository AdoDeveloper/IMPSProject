const express = require('express');
const router = express.Router();
const carreraQueries = require('../repositories/CarreraRepository');

// Listar todas las carreras
router.get('/', async (request, response) => {
    try {
        const carreras = await carreraQueries.obtenerTodasLasCarreras();
        response.render('carreras/listado', { carreras });
    } catch (error) {
        console.error('Error al obtener las carreras:', error);
        response.redirect('/');
    }
});

// Mostrar el formulario para agregar una nueva carrera
router.get('/agregar', (request, response) => {
    response.render('carreras/agregar');
});

// Agregar una nueva carrera
router.post('/agregar', async (request, response) => {
    try {
        const { idcarrera, carrera } = request.body;
        const resultado = await carreraQueries.agregarCarrera({ idcarrera, carrera });
        if (resultado) {
            response.redirect('/carreras');
        } else {
            response.render('carreras/agregar', { error: 'No se pudo agregar la carrera' });
        }
    } catch (error) {
        console.error('Error al agregar la carrera:', error);
        response.render('carreras/agregar', { error: 'Ocurrió un error' });
    }
});

// Mostrar el formulario para modificar una carrera existente
router.get('/modificar/:idcarrera', async (request, response) => {
    try {
        const { idcarrera } = request.params;
        const carrera = await carreraQueries.obtenerCarreraPorId(idcarrera);
        response.render('carreras/modificar', { carrera });
    } catch (error) {
        console.error('Error al obtener la carrera:', error);
        response.redirect('/carreras');
    }
});

// Modificar una carrera existente
router.post('/modificar/:idcarrera', async (request, response) => {
    try {
        const { idcarrera } = request.params;
        const { carrera } = request.body;
        const resultado = await carreraQueries.actualizarCarrera(idcarrera, { carrera });
        if (resultado) {
            response.redirect('/carreras');
        } else {
            response.render('carreras/modificar', { error: 'No se pudo actualizar la carrera', carrera });
        }
    } catch (error) {
        console.error('Error al actualizar la carrera:', error);
        response.redirect('/carreras');
    }
});

// Eliminar una carrera
router.get('/eliminar/:idcarrera', async (request, response) => {
    try {
        const { idcarrera } = request.params;
        const resultado = await carreraQueries.eliminarCarrera(idcarrera);
        if (resultado) {
            response.redirect('/carreras');
        } else {
            response.redirect('/carreras');
        }
    } catch (error) {
        console.error('Error al eliminar la carrera:', error);
        response.redirect('/carreras');
    }
});

module.exports = router;
