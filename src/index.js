const express = require('express');

// Inicializaciones
const app = express();

require('dotenv').config()

// Ajustes del servidor
app.set('port', process.env.PORT || 4000);

// Configuracion de rutas
app.use(require('./routes')); // Node automaticamente busca el index.js del modulo

// Iniciar el servidor
app.listen(app.get('port'), () => {
console.log('Servidor iniciado en el puerto: ', app.get('port'));

});