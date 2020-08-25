// Importaciones
const { OAuth2Client } = require('google-auth-library');

// Crea una autenticación:
const client = new OAuth2Client(process.env.GOOGLE_ID);

// Verifica el token:
const googleVerify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID, // Especifica el ID de cliente proporcionado por Google
    });
    // Obtiene el Payload
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    const { name, email, picture } = payload; // Extrae elementos del Payload
    return { name, email, picture }; // Retorna los elementos extraidos
}

// Exportaciones
module.exports = {
    googleVerify
}