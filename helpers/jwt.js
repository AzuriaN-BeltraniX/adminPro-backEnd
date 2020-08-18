// Importaciones
const jwt = require('jsonwebtoken');

// Genera un TOKEN con JsonWebToken:
const generarJWT = (userID) => {
    // Promesa...
    return new Promise( (resolve, reject) => {
        // Requeire de un Payload para generar el token, entonces:
        const payload = {
            userID
        };
    
        // Cargado el PAYLOAD, genera el Token
        jwt.sign(payload, process.env.JWT_SECRET, {
           expiresIn: '24h' // Con caducidad de 24 Horas.
        }, (err, token) => {
            if (err) { // Si hay un error, entonces...
                console.log(err); // Imprime el error
                reject('No se pudo generar el Token...') // Rechaza la generación del TOKEN con un mensaje de error
            } else { // Si no hay error, entonces... 
                resolve(token) // Muestra el token del usuario autenticado.
            }
        });
    });
}

// Exportaciones
module.exports = {
    generarJWT
}