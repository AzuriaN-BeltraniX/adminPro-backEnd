/* Médicos:
    RUTA Padre: '/api/doctors'
*/

// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerMedico, crearMedico, actualizarMedico, borrarMedico, obtenerMedicoPorId } = require('../controllers/medicos');
 
// Declaraciones
const router = Router();

// Rutas:

// Obtiene los Medicos -------------------------------------------
router.get('/', validarJWT, obtenerMedico);

// Crea Medicos --------------------------------------------------
router.post('/',
    [
        validarJWT, // Valida el token del usuario logeado
        check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(), // Valida el campo del nombre
        check('hospital', 'La ID del hospital ingresado debe ser válido').isMongoId(), // Valida si el hospital existe
        validarCampos // Valida los datos de los campos.
    ],
    crearMedico
);

// Actualiza Medicos ---------------------------------------------
router.put('/:id',
    [
        validarJWT, // Valida el token del usuario logeado
        check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(), // Valida el campo del nombre
        check('hospital', 'La ID del hospital ingresado debe ser válido').isMongoId(), // Valida si el hospital existe
        validarCampos // Valida los datos de los campos.
    ],
    actualizarMedico
); 

// Borra un Medico ------------------------------------------------
router.delete('/:id',
    validarJWT,
    borrarMedico
); 

// Obtiene un Medico mediante ID en la URL ------------------------
router.get('/:id',
    validarJWT,
    obtenerMedicoPorId
); 

// Exportaciones
module.exports = router;