// Importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

// Logging In
const login = async(req, res = response) => {
    // Requiere del Correo Electrónico y Contraseña en el BODY:
    const { email, password } = req.body;

    // Promesa...
    try {
        // Validando la existencia del correo electrónico
        const usuarioDB = await Usuario.findOne({email}); // Busca el correo ingresado en la base de datos
        if (!usuarioDB) { // Si no encuentra el correo solicitado, entonces:
            return res.status(404).json ({
                ok: false,
                msg: "Correo no válido?..."
            }); // Retorna el mensaje de error.
        }

        // Validando la contraseña del usuario solicitado
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) { // Si la contraseña no es válida, entonces...
            return res.status(400).json({
                ok: false,
                msg: "La contraseña no es válida"
            }); // Retorna el mensaje de error
        }

        // Si el correo y contraseñas son válidas, entonces genera un TOKEN (JWT):
        const token = await generarJWT(usuarioDB.id);

        // Prueba de data:
        res.json({
            ok: true,
         // msg: 'LogIn en funcionamiento!!!'
            token // Muestra el token.
        })
    } catch(error) { // Si hay error entonces...
        console.log(error); // Imprime el error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        }); // Muestra el mensaje de error.
    }
}

// Exportaciones
module.exports = {
    login
}