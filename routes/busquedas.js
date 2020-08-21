/* Rutas:
    Padre: '/search/:busqueda'
    Hijas: '/collection/:tabla/:busqueda
*/

// Importaciones
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerBusquedaUsuario, obtenerDocumentosColeccion } = require('../controllers/busquedas');

// Obtener la búsqueda de un Usuario mediante un ID existente: ------
router.get('/:busqueda', validarJWT, obtenerBusquedaUsuario)
router.get('/collection/:tabla/:busqueda', validarJWT, obtenerDocumentosColeccion)

// Exportaciones
module.exports = router;