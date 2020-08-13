// Importaciones
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor express.
const app = express();

// Configuración del CORS
app.use( cors() );

// Conexión a la Base de Datos.
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

// Esuchando el puerto 3000.
const port = process.env.PORT; // Define el puerto...

app.listen(port, () => {
    console.log(`Running server in port: ${port}`);
}); // Escucha el puerto definido



// ------------------------------- Credenciales MongoDB ---
    // user: azbel
    // password: 5Vxqbp2HQ7OvWH7K
// --------------------------------------------------------