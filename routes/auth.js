/*
    Path: '/api/login'
*/

// Importaciones
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta de inicio de sesión:
router.post('/', 
    [
        check('email', 'El correo electrónico es obligatorio').isEmail(), // Verifica el correo en el Input
        check('password', 'La contraseña es obligatoria').not().isEmpty(), // Verifica la contraseña en el Input
        validarCampos // Valida los campos de contraseña y correo electrónico
    ],
    login
)
// Ruta de inicio de sesión con Google
router.post('/google', 
    [
        check('token', 'El token de Google es obligatorio').not().isEmpty(), // Valida el Token de Google
        validarCampos // Valida los campos de contraseña y correo electrónico
    ],
    googleSignIn
)
// Ruta para renovar el Token de usuario:
router.get('/renew',
    validarJWT,
    renewToken
)

// Exportaciones
module.exports = router;