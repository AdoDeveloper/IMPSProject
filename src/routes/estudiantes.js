const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    response.render('estudiantes/listado', { estudiantes }); // Mostramos ellistado de estudiantes
});
// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();
    response.render('estudiantes/agregar', { carreras });
});

// Endpoint para agregar un estudiante
router.post('/agregar', async (request, response) => {
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const estudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };
    const resultado = await queries.agregarEstudiante(estudiante);
    if (resultado) {
        console.log('Estudiante agregado exitosamente');
        response.redirect('/estudiantes');
    } else {
        console.log('Error al agregar el estudiante');
        response.redirect('/estudiantes/agregar');
    }
});

router.get('/modificar/:idestudiante', async (request, response) => {
    try {
        const { idestudiante } = request.params;
        const estudiante = await queries.obtenerEstudiantePorId(idestudiante);
        const carreras = await queries.obtenerTodasLasCarreras();

        if (estudiante) {
            response.render('estudiantes/modificar', {
                idestudiante: estudiante.idestudiante,
                nombre: estudiante.nombre,
                apellido: estudiante.apellido,
                email: estudiante.email,
                idcarrera: estudiante.idcarrera,
                usuario: estudiante.usuario,
                carreras
            });
        } else {
            response.redirect('/estudiantes');
        }
    } catch (error) {
        console.error('Error al obtener el estudiante o las carreras: ', error);
        response.redirect('/estudiantes');
    }
});



router.post('/modificar/:idestudiante', async (request, response) => {
    try {
        const { idestudiante } = request.params;
        const { nombre, apellido, email, idcarrera, usuario } = request.body;

        // Lógica para actualizar el estudiante en la base de datos
        await queries.actualizarEstudiante(idestudiante, { nombre, apellido, email, idcarrera, usuario });

        // Redireccionar después de la actualización
        response.redirect('/estudiantes');
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        response.redirect('/estudiantes');
    }
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});
module.exports = router;