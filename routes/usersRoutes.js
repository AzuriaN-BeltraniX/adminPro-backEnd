/* Rutas:
        Padre: /api/users
*/

// Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { obtenerUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');
 
// Declaraciones
const router = Router();

// Rutas


// Obtiene los usuarios -------------------------------------------
router.get('/', validarJWT, obtenerUsuarios);

// Crea los usuarios ----------------------------------------------
router.post('/',
    [ // Validación del esquema ('UsuarioSchema'):
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), // Validación del nombre
        check('password', 'El password es obligatorio').not().isEmpty(), // Validación de la contraseña
        check('email', 'El email es obligatorio').isEmail(), // Validación del correo electrónico
        validarCampos
    ],
    crearUsuarios
);

// Actualiza los usuarios -----------------------------------------
router.put('/:id',
    [ // Validación del esquema ('UsuarioSchema'):
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), // Validación del nombre
        check('email', 'El email es obligatorio').isEmail(), // Validación del correo electrónico
        check('role', 'El rol de usuario es obligatorio').not().isEmpty(), // Validación del rol del usuario
        validarCampos
    ],
    actualizarUsuarios
); 

// Borra los usuarios ---------------------------------------------
router.delete('/:id',
    validarJWT,
    borrarUsuarios
); 

// Exportaciones
module.exports = router;