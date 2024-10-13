const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los profesores
router.get('/', async (request, response) => {
    const profesores = await queries.obtenerTodosLosProfesores();
    response.render('profesores/listado', { profesores }); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar un nuevo profesor
router.get('/agregar', (request, response) => {
    response.render('profesores/agregar'); // Mostramos el formulario de agregar profesor
});

// Endpoint para agregar un profesor
router.post('/agregar', async (request, response) => {
    const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
    const profesor = { nombre, apellido, fecha_nacimiento, profesion, genero, email };
    const resultado = await queries.agregarProfesor(profesor);
    if (resultado) {
        console.log('Profesor agregado exitosamente');
        response.redirect('/profesores');
    } else {
        console.log('Error al agregar el profesor');
        response.redirect('/profesores/agregar');
    }
});

// Endpoint que permite mostrar el formulario para modificar un profesor
router.get('/modificar/:idprofesor', async (request, response) => {
    try {
        const { idprofesor } = request.params;
        const profesor = await queries.obtenerProfesorPorId(idprofesor);

        if (profesor) {
            response.render('profesores/modificar', {
                idprofesor: profesor.idprofesor,
                nombre: profesor.nombre,
                apellido: profesor.apellido,
                fecha_nacimiento: profesor.fecha_nacimiento,
                profesion: profesor.profesion,
                genero: profesor.genero,
                email: profesor.email
            });
        } else {
            response.redirect('/profesores');
        }
    } catch (error) {
        console.error('Error al obtener el profesor:', error);
        response.redirect('/profesores');
    }
});

// Endpoint para modificar un profesor
router.post('/modificar/:idprofesor', async (request, response) => {
    try {
        const { idprofesor } = request.params;
        const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;

        // Lógica para actualizar el profesor en la base de datos
        await queries.actualizarProfesor(idprofesor, { nombre, apellido, fecha_nacimiento, profesion, genero, email });

        // Redireccionar después de la actualización
        response.redirect('/profesores');
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        response.redirect('/profesores');
    }
});

// Endpoint que permite eliminar un profesor
router.get('/eliminar/:idprofesor', async (request, response) => {
    const { idprofesor } = request.params;
    const resultado = await queries.eliminarProfesor(idprofesor);
    if (resultado > 0) {
        console.log('Profesor eliminado con éxito');
    }
    response.redirect('/profesores');
});

module.exports = router;
