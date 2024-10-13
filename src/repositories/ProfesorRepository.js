const pool = require("../config/databaseController");

module.exports = {
  // Consulta para obtener todos los profesores
  obtenerTodosLosProfesores: async () => {
    try {
      const result = await pool.query("SELECT * FROM profesores");
      return result;
    } catch (error) {
      console.error(
        "Ocurrió un problema al consultar la lista de profesores: ",
        error
      );
    }
  },

  // Eliminar un profesor
  eliminarProfesor: async (idprofesor) => {
    try {
      const result = await pool.query(
        "DELETE FROM profesores WHERE idprofesor = ?",
        [idprofesor]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al eliminar el registro de profesor", error);
    }
  },

  // Método para agregar un nuevo profesor
  agregarProfesor: async (profesor) => {
    try {
      const result = await pool.query(
        "INSERT INTO profesores (nombre, apellido, fecha_nacimiento, profesion, genero, email) VALUES (?, ?, ?, ?, ?, ?)",
        [
          profesor.nombre,
          profesor.apellido,
          profesor.fecha_nacimiento,
          profesor.profesion,
          profesor.genero,
          profesor.email,
        ]
      );
      return result.affectedRows > 0; // Verificamos que se haya insertado el profesor
    } catch (error) {
      console.error("Error al insertar el profesor", error);
    }
  },

  // Método para actualizar un profesor
  actualizarProfesor: async (idprofesor, profesor) => {
    try {
      const result = await pool.query(
        "UPDATE profesores SET nombre = ?, apellido = ?, fecha_nacimiento = ?, profesion = ?, genero = ?, email = ? WHERE idprofesor = ?",
        [
          profesor.nombre,
          profesor.apellido,
          profesor.fecha_nacimiento,
          profesor.profesion,
          profesor.genero,
          profesor.email,
          idprofesor,
        ]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al actualizar el profesor", error);
    }
  },

  // Obtener un profesor por su ID
  obtenerProfesorPorId: async (idprofesor) => {
    try {
      const result = await pool.query(
        "SELECT * FROM profesores WHERE idprofesor = ?",
        [idprofesor]
      );
      return result[0]; // Suponiendo que siempre obtendremos un solo registro
    } catch (error) {
      console.error("Error al obtener el profesor por ID: ", error);
    }
  },
};
