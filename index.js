// Importaciones
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor express.
const app = express();

// Configuración del CORS
app.use( cors() );

// Lectura y Parseo del BODY
app.use(express.json());

// Conexión a la Base de Datos.
dbConnection();

// Rutas
app.use('/api/users', require('./routes/usuario')); // Usuarios
app.use('/api/hospitals', require('./routes/hospitales')); // Hospitales
app.use('/api/doctors', require('./routes/medicos')); // Médicos
app.use('/api/login', require('./routes/auth')); // Inicio de Sesión
app.use('/api/search', require('./routes/busquedas')); // Búsqueda global
app.use('/api/search/collection', require('./routes/busquedas')); // Búsqueda por colección
app.use('/api/upload', require('./routes/uploads')); // Archivos

// Esuchando el puerto 3000.
const port = process.env.PORT; // Define el puerto...

app.listen(port, () => {
    console.log(`Running server in port: ${port}`);
}); // Escucha el puerto definido



// ------------------------------- Credenciales MongoDB ---
    // user: azbel
    // password: VsMhBuAMtsx5N6G6
// --------------------------------------------------------