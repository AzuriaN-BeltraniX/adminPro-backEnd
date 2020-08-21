/* Hospitales:
    RUTA Padre: '/api/hospitals'
*/

// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerHospital, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
 
// Declaraciones
const router = Router();

// Rutas:

// Obtiene los hospitales -------------------------------------------
router.get('/', obtenerHospital);

// Crea hospitales --------------------------------------------------
router.post('/',
    [
        validarJWT, // Valida el TOKEN de inicio de sesión
        check('nombre', 'El nombre del hospital es necesario.').not().isEmpty(), // Verifica existencia del nombre.
        validarCampos // Valida los datos enviados
    ],
    crearHospital
);

// Actualiza hospitales ---------------------------------------------
router.put('/:id',
    [],
    actualizarHospital
); 

// Borra un hospital ------------------------------------------------
router.delete('/:id',
    borrarHospital
); 

// Exportaciones
module.exports = router;