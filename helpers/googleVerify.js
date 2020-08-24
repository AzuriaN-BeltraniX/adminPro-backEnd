// Importaciones
const { OAuth2Client } = require('google-auth-library');

// Crea una autenticación:
const client = new OAuth2Client(process.env.GOOGLE_ID);

// Verifica el token:
const googleVerify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    // Obtiene el Payload
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    // Imprime el Payload
    console.log(payload);
    const { name, email, picture } = payload; // Extrae elementos del Payload
    return { name, email, picture }; // Retorna los elementos extraidos
}

// Exportaciones
module.exports = {
    googleVerify
}