// Importaciones
const jwt = require('jsonwebtoken');

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
        const {userID} = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = userID; // Recupera el ID de usuario.

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

// Exportaciones
module.exports = {
    validarJWT
}