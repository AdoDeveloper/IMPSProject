const pool = require("../config/databaseController");
module.exports = {
  // Consulta para obtener todos los estudiantes
  obtenerTodosLosEstudiantes: async () => {
    try {
      const result = await pool.query("SELECT * FROM estudiantes");
      return result;
    } catch (error) {
      console.error(
        "Ocurrio un problema al consultar la lista de estudiantes: ",
        error
      );
    }
  },

  // Eliminar un estudiante
  eliminarEstudiante: async (idestudiante) => {
    try {
      const result = await pool.query(
        "DELETE FROM estudiantes WHERE idestudiante = ?",
        [idestudiante]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Erro al eliminar el registro", error);
    }
  },

  // Método para agregar un nuevo estudiante
  agregarEstudiante: async(estudiante) => {
    try {
        const result = await pool.query('INSERT INTO estudiantes (idestudiante, nombre, apellido, email, idcarrera, usuario) VALUES (?, ?, ?, ?, ?, ?)', 
        [estudiante.idestudiante, estudiante.nombre, estudiante.apellido, estudiante.email, estudiante.idcarrera, estudiante.usuario]);
        return result.affectedRows > 0; // Verificamos que se haya insertado el estudiante
    } catch (error) {
        console.error('Error al insertar el estudiante', error);
    }
  },

  // Método para actualizar un estudiante
  actualizarEstudiante: async(idestudiante, estudiante) => {
    try {
        const result = await pool.query('UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idestudiante = ?', 
        [estudiante.nombre, estudiante.apellido, estudiante.email, estudiante.idcarrera, estudiante.usuario, idestudiante]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al actualizar el estudiante', error);
    }
  },

  obtenerEstudiantePorId: async (idestudiante) => {
    try {
        const result = await pool.query('SELECT * FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
        return result[0];  // Suponiendo que siempre obtendremos un solo registro
    } catch (error) {
        console.error('Error al obtener el estudiante por ID: ', error);
    }
  },

  obtenerTodasLasCarreras: async() => {
    try {
        const result = await pool.query('SELECT * FROM carreras');
        return result;
    } catch (error) {
        console.error('Error al obtener las carreras', error);
    }
}
};
