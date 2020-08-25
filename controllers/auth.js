// Importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');

// Controlador para iniciar sesión:
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

// Controlador para iniciar sesión con Google:
const googleSignIn = async(req, res = response) => {
    // Requiere el Token del BODY:
    const googleToken = req.body.token;

    // Promesa...
    try {
        // Verifica el Token de Google:
        const { name, email, picture } = await googleVerify(googleToken);

        // Buscando un usuario existente mediante Correo Electrónico:
        const usuarioDB = await Usuario.findOne({email});
        let usuario; // Crea la variable "usuario"
        if (!usuarioDB) { // Si no existe un usuario con el correo electrónico en la Base de datos, entonces:
            usuario = new Usuario({ 
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            }); // ...Crea un nuevo usuario

            // Si ya extrajo los datos de la autenticación y cambió el valor de google, entonces:
            await usuario.save(); // ...Guarda el usuario en la base de datos
            const token = await generarJWT(usuario.id); // ...Genera un token
            res.json({ 
                ok: true, // Autenticación exitosa!!!
                token // Token del usuario
            }); // ...Imprime el resultado de la petición:
        } else { // Si sí existe el usuario, entonces...
            usuario = usuarioDB; // Extrae el correo
            usuario.google = true; // Modifica el valor de google a 'true'
        }

        /* Prueba de Data
            res.json({
                ok: true,
                msg: 'googleSignIn is working!!!',
                'Datos del usuario': {
                    name,
                    email,
                    picture
                }
            });
        */
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'El token no es válido o no existe...'
        });
    }
}

// Controlador para generar un nuevo Token:
const renewToken = async(req, res = response) => {
    // Requiere del ID de usuario del BODY:
    const userId = req.userId;

    // Genera un nuevo token:
    const token = await generarJWT(userId);

    // Prueba de data
    res.json({
        ok: true,
        token
    });
}

// Exportaciones
module.exports = {
    login,
    googleSignIn,
    renewToken
}