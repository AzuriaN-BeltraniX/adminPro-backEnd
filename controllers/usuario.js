// Importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

// Controlador para obtener usuarios:
const obtenerUsuarios = async(req, res) => {
    /* Prueba de data:
        res.json({
            ok: true,
            // usuarios: [usuarios],
            msg: 'Obteniendo Usuarios'
        });
    */
   
    // Filtrando número de usuarios mostrados:
    const desde = Number(req.query.desde) || 0; // Obtiene el parámetro y lo transforma a número, si no exite, por defecto es 0
    /* Prueba de data:
        console.log(desde);
    */
    
    /*
        // Lista los usuarios existentes en la base de datos:
        const usuarios = await Usuario
            .find({}, 'nombre email role google') // También filtra parámetros
            .skip(desde) // Muestra desde el número de usuario registrado
            .limit(5) // Limita a 5 resultados

        // Conteo de registros mostrados
        const total = await Usuario.count();
    */

    // Promesa...
    const [usuarios, total] = await Promise.all([ // Muestrame el resultado de las siguientes promesas:
        // Lista los usuarios existentes en la base de datos:
        Usuario
            .find({}, 'nombre email role google img') // También filtra parámetros
            .skip(desde) // Muestra desde el número de usuario registrado
            .limit(5), // Limita a 5 resultados
        
        // Conteo de usuarios registrados
        Usuario.countDocuments()
    ]);

    // Si se pudo ejecutar la búsqueda, entonces imprime el resultado de la petición.
    res.json({
        ok: true, // Listado exitoso!!!
        usuarios, // Lista de los usuarios existentes
        'Usuarios registrados': total, // Núemro total de registros
        '¿Quién buscó?': `ID de Usuario: ${req.userID}` // Muestra la ID de usuario que realió la petición GET.
    })
}

// Controlador para crear usuarios:
const crearUsuarios = async(req, res) => {
    /* Prueba de data:
        res.json({
            ok: true,
            // usuario: [usuario],
            msg: 'Creando Usuarios'
        });
        console.log(req.body);     
    */

    // Captura datos
    const { email, password } = req.body;

    // Promesa...
    try {
        // Busca email en el registro, para evitar duplciados.
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) { // Si existe el email, entonces...
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado...'
            }); // Retorna el menssaje de error.
        }

        // Creación del Usuario
        const usuario = new Usuario(req.body); // Crea un usuario

        // Encriptación de la contraseña.
        const salt = bcrypt.genSaltSync(); // Genera la encriptación
        usuario.password = bcrypt.hashSync(password, salt); // Determina el parámetro a encriptar
        
        // Guarda al usuario creado
        await usuario.save();

        // Si el correo y contraseñas son válidas, entonces genera un TOKEN (JWT):
        const token = await generarJWT(usuario.id);

        // Respuesta de la petición al guardar usuario:
        res.json({
            ok: true, // Creación exitosa!!!
            usuario, // Muestra los datos del usuario creado
            token // Muestra el TOKEN generado.
        });
    } catch(error) { // Si no se puede crear usuario, entonces...
        console.log(error); // Imprime el error
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        }); // Retorna el mensaje de error.
    }
}

// Controlador para actualizar usuarios:
const actualizarUsuarios = async(req, res = response) => {
// TODO: Validar token y comprobar si el usuario es correcto.

    // Requiere del ID de un usuario;
    const userID = req.params.id;

    // Promesa...
    try {
        // Busca un usuario existente mediante un ID:
        const usuarioDB = await Usuario.findById(userID);

        if (!usuarioDB) { // Si no encuentra un usuario, entonces...
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id ${userID}`
            }); // Imprime el mensaje de error.
        }

        // Actualiza un usuario:
        const { password, // Omite el la actualización a la contraseña
                google, // Omite la actualización a autenticación por Google
                email, // "Omite" el email
                ...campos } = req.body; // Requiere el BODY para obtener los campos a actualizar

        if (usuarioDB.email !== email) { // Si el correo electrónico es diferente, entonces...
            const existeEmail = await Usuario.findOne({email}) // Busca el correo existente, pero...
            if (existeEmail) { // Si existe el correo, entonces...
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo electrónico...'
                }); // Retorna un mensaje de error.
            }
        }

        // Actualiza el correo siempre y cuando el usuario no provenga de Google, entonces...
        if (!usuarioDB.google) {
            campos.email = email; // Email a actualizar:
        } else if (usuarioDB.email !== email) { // Si el correo de google es diferente e intenta actualizar, entonces:
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario de Google no puede actualizar su correo electrónico...'
            }); // Retorna un mensaje de error.
        }

        // Actualiza el usuario requiriendo el ID de usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(userID, campos, {new: true}); // (muestra actualización inmediata).

        // Respuesta de la petición para actualizar el usuario:
        res.json({
            ok: true, // Acualización exitosa!!!
            usuario: usuarioActualizado // Muestra actualización de los datos.
        })
        
        /*  Prueba de obtención del ID del usuario:
            res.json({
                ok: true,
                userID
            });
        */
    } catch (error) { // Si no se puede actualizar el usuario, entonces...
        console.log(error); // Imprime el error
        res.status(500).json({
            ok: false,
            msg: 'Error en la actualzación del usuario.'
        }); // Retorna el mensaje de error
    }
}

// Controlador para borrar los usuarios:
const borrarUsuarios = async(req, res = response) => {
    // Requiere del ID de usuario
    const userID = req.params.id;

    // Promesa...
    try {
        // Busca un usuario existente mediante un ID:
        const usuarioDB = await Usuario.findById(userID);

        if (!usuarioDB) { // Si no encuentra un usuario, entonces...
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el ID: '${userID}'.`
            }); // Imprime el mensaje de error.
        }

        await Usuario.findByIdAndDelete(userID) // Si existe un usuario

        // /* Prueba de data
            res.json({
                ok: true,
                msg: `El usuario '${userID}', fue eliminado con éxito.`
            })
    } catch(error) { // Si no se puede borrar el usuario entonces...
        console.log(error); // Muestra error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); // Imprime mensaje de error.
    }
}

// Exportaciones
module.exports = {
    obtenerUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios
}