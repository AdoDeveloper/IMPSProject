const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');

// Endpoint para mostrar todas las materias
router.get('/', async (request, response) => {
    const materias = await queries.obtenerTodasLasMaterias();
    response.render('materias/listado', { materias });
});

// Endpoint para mostrar el formulario para agregar una nueva materia
router.get('/agregar', (request, response) => {
    response.render('materias/agregar');
});

// Endpoint para agregar una nueva materia
router.post('/agregar', async (request, response) => {
    const { materia } = request.body;
    const resultado = await queries.agregarMateria({ materia });
    if (resultado) {
        response.redirect('/materias');
    } else {
        response.redirect('/materias/agregar');
    }
});

// Endpoint para mostrar el formulario de modificar una materia
router.get('/modificar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const materia = await queries.obtenerMateriaPorId(idmateria);
    response.render('materias/modificar', { idmateria, materia: materia.materia });
});

// Endpoint para modificar una materia
router.post('/modificar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const { materia } = request.body;
    await queries.actualizarMateria(idmateria, { materia });
    response.redirect('/materias');
});

// Endpoint para eliminar una materia
router.get('/eliminar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria);
    if (resultado) {
        response.redirect('/materias');
    }
});

module.exports = router;
