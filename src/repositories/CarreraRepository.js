const pool = require('../config/databaseController');

module.exports = {
    // Obtener todas las carreras
    obtenerTodasLasCarreras: async () => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Error al obtener las carreras:', error);
        }
    },

    // Obtener una carrera por su ID
    obtenerCarreraPorId: async (idcarrera) => {
        try {
            const result = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result[0];
        } catch (error) {
            console.error('Error al obtener la carrera por ID:', error);
        }
    },

    // Agregar una nueva carrera
    agregarCarrera: async (carrera) => {
        try {
            const result = await pool.query('INSERT INTO carreras (idcarrera, carrera) VALUES (?, ?)', 
            [carrera.idcarrera, carrera.carrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al agregar la carrera:', error);
        }
    },

    // Actualizar una carrera existente
    actualizarCarrera: async (idcarrera, carrera) => {
        try {
            const result = await pool.query('UPDATE carreras SET carrera = ? WHERE idcarrera = ?', 
            [carrera.carrera, idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la carrera:', error);
        }
    },

    // Eliminar una carrera
    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la carrera:', error);
        }
    }
};
