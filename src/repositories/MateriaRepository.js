const pool = require("../config/databaseController");

module.exports = {
    // Obtener todas las materias
    obtenerTodasLasMaterias: async () => {
        try {
            const result = await pool.query("SELECT * FROM materias");
            return result;
        } catch (error) {
            console.error("Error al obtener las materias: ", error);
        }
    },

    // Agregar una nueva materia
    agregarMateria: async (materia) => {
        try {
            const result = await pool.query("INSERT INTO materias (materia) VALUES (?)", [materia.materia]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al agregar la materia: ", error);
        }
    },

    // Obtener una materia por su ID
    obtenerMateriaPorId: async (idmateria) => {
        try {
            const result = await pool.query("SELECT * FROM materias WHERE idmateria = ?", [idmateria]);
            return result[0];
        } catch (error) {
            console.error("Error al obtener la materia: ", error);
        }
    },

    // Actualizar una materia
    actualizarMateria: async (idmateria, materia) => {
        try {
            const result = await pool.query("UPDATE materias SET materia = ? WHERE idmateria = ?", [materia.materia, idmateria]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al actualizar la materia: ", error);
        }
    },

    // Eliminar una materia
    eliminarMateria: async (idmateria) => {
        try {
            const result = await pool.query("DELETE FROM materias WHERE idmateria = ?", [idmateria]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error al eliminar la materia: ", error);
        }
    }
};
