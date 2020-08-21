/* Rutas:
    Padre: '/api/uploads/'
*/

// Importaciones
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, muestraImagen } = require('../controllers/uploads');

// Define la variable, siendo igual de la imprtación:
const router = Router();

// Middleware:
router.use(expressFileUpload());

// Sube un archivo: -----------------------------------------
router.put('/:tipo/:id', validarJWT, fileUpload);

// Muestra un archivo: -----------------------------------------
router.get('/:tipo/:img', muestraImagen);

// Exportaciones
module.exports = router;