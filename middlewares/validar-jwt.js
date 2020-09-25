// Importaciones
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Validando el TOKEN
const validarJWT = (req, res, next) => {
    // Requiere leer el TOKEN del HEADER:
    const token = req.header('x-token');
    if (!token) { // Si no existe un token, entonces
        return res.status(401).json({ // Retorna el error de servicios
            ok: false,
            msg: 'No hay un token en la petición...'
        }); // Imrpime el mensaje de error.
    }

    // Promesa...
    try {
        // Si existe el TOKEN, verifícalo...
        const {userID, role} = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = userID; // Recupera el ID de usuario.
        req.role = role; // Recupera el rol de usuario.

        // Si hay TOKEN. entonces ejecuta la función NEXT.
        next();

        /* Prueba de data:
            console.log(userID);
        */
    } catch(error) { // Si no se puede validar el TOKEN, entonces...
        return res.status(401).json({ // Retorna el error de servicios
            ok: false,
            msg: 'El Token no es válido'
        }); // Imprime el mensaje de error.
    }

    /* Prueba de Data 
        console.log(token); // Imprime el TOKEN en consola.
    */
}

// Validando el Rol de Usuario
const validarAdmin = (req, res, next) => {
    // Requiere del ID del usuario
    const userID = req.userID;
    const role = req.role;

    // Prueba de data
    /*
        console.log('');
        console.log(`ID de usuario: ${userID}`);
        console.log(`Rol de Usuario: ${role}`);
    */

    // Promesa
    try {
        // Busca un usuario por ID
        const usuarioDB = Usuario.findById(userID);

        // Si no existe el usuario entonces...
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false, // Búsqueda fallida...
                msg: 'El usuario no existe'
            }); // ... retorna el mensaje de error
        }
        // Si existe el usuario, pero no es administrador, entonces...
        if(role !== 'ADMIN_ROLE') {
                return res.status(403).json({
                ok: false, // Búsqueda fallida...
                msg: 'No tiene permitido hacer esta acción, hable con el administrador'
            }); // ... retorna el mensaje de error
        }
        next();
    } catch (error) { // Si no se puede validar el rol, muestra mensaje de error,
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        console.log(error); // ... imprime el error en consola
    }
}

// Validando el Rol de Usuario y el ID del Usuario
const validarRol_Usuario = (req, res, next) => {
    // Requiere de los siguientes parámetros:
    const userID = req.userID; // Rescata ID del usuario logueado
    const loginID = req.params.id; // Obtiene el id de los párámetros
    const role = req.role; // Rescata el rol del usuario logueado

    // Prueba de data
    /*
        console.log('');
        console.log(`ID de usuario: ${userID}`);
        console.log(`ID de "params": ${loginID}`);
        console.log(`Rol de Usuario: ${role}`);
    */

    // Promesa
    try {
        // Busca al usuario por ID
        const usuarioDB = Usuario.findById(userID);

        // Si no existe el usuario entonces...
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false, // Búsqueda fallida...
                msg: 'El usuario no existe'
            }); // ... retorna el mensaje de error
        }

        // Valida al usuario... 
        /* Si su rol declara que es un administrador, ó valida si es el usuario mismo usuario que
        intenta actualizar su información, si cualquiera de estas validaciones se cumple, entonces... */
        if(role === 'ADMIN_ROLE' || userID === loginID) {
            next(); // ... Permite ejecutar la acción
        } else { // ... si ninguna de las condiciones anteriores se cumple, entonces... 
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permitido hacer esta acción, hable con el administrador'
            }); // ... retorna el mensaje de error.
        }
    } catch (error) { // Si no se pueden realizar las validaciones anteriores por cuestión del servidor, entonces:
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); // ... muestra el mensaje de error
        console.log(error); // ... captura el error en la consola.
    }
}

// Exportaciones
module.exports = {
    validarJWT,
    validarAdmin,
    validarRol_Usuario
}