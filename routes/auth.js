/*
    Pathi: '/api/login'
*/

// Importaciones
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Ruta de inicio de seción:
router.post('/', 
    [
        check('email', 'El correo electrónico es obligatorio').isEmail(), // Verifica el correo en el Input
        check('password', 'La contraseña es obligatoria').not().isEmpty(), // Verifica la contraseña en el Input
        validarCampos // Valida los campos de contraseña y correo electrónico
    ],
    login
)


// Exportaciones
module.exports = router;