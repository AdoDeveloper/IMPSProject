const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars"); // Necesario para utilizar el motor de plantillas handlebars
const path = require("path");

// Inicializaciones
const app = express();
require("dotenv").config();

// Ajustes del servidor
app.set("port", process.env.PORT || 4500);
app.set("views", path.join(__dirname, "views")); // Configuración de la ruta donde se encuentran las vistas

app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main", // Configuración del layout principal
    layoutsDir: path.join(app.get("views"), "layouts"), // Configuración de la ruta de los layouts
    partialsDir: path.join(app.get("views"), "partials"), // Configuración de vistas parciales
    extname: ".hbs", // Configura la extensión que tendrán los archivos
    helpers: require("./lib/handlebars"), // Configuración de funciones
  })
);
app.set("view engine", ".hbs"); // Configuración para ejecutar el motor de plantillas

app.use(morgan("dev")); // Configurando el middleware morgan para visualizar qué está llegando al servidor
app.use(express.urlencoded({ extended: false })); // Permite aceptar datos desde formularios

// Configuración de rutas
app.use(require("./routes")); // Node busca automáticamente el index.js del módulo
app.use("/estudiantes", require("./routes/estudiantes")); // Configuración de ruta para estudiantes
app.use("/carreras", require("./routes/carreras")); // Configuración de ruta para carreras
app.use("/profesores", require("./routes/profesores"));

// Archivos públicos (aquí se coloca todo el código al que el navegador puede acceder)
app.use(express.static(path.join(__dirname, "public")));

// Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor iniciado en el puerto: http://localhost:${app.get("port")}`);
});
