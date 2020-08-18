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
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/login', require('./routes/auth'));

// Esuchando el puerto 3000.
const port = process.env.PORT; // Define el puerto...

app.listen(port, () => {
    console.log(`Running server in port: ${port}`);
}); // Escucha el puerto definido



// ------------------------------- Credenciales MongoDB ---
    // user: azbel
    // password: VsMhBuAMtsx5N6G6
// --------------------------------------------------------