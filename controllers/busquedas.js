// Importaciones
const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospitales');

// Controlador para realizar una búsqueda por ID de usuario existente: 
const obtenerBusquedaTotal = async (req, res = response) => {
    // Realizando la búsqueda:
    const busqueda = req.params.busqueda; // Requiere el parámetro de búsqueda
    const regex = new RegExp(busqueda, 'i'); // Declarando expresión regular de búsqueda insensible.

    // Promesa...
    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({nombre: regex}), // Búsqueda de usuarios
        Medico.find({nombre: regex})
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img'), // Búsqueda de médicos
        Hospital.find({nombre: regex}) // Búsqueda de hospitales
    ]);

    // Prueba de data:
    res.json({
        ok: true, // Búsqueda exitosa!!!
        // Muestra el resutlado de la busqueda:
        usuarios,
        medicos, 
        hospitales
    });
}

// Controlador para realizar una búsqueda mediante colecciones existentes: 
const obtenerDocumentosColeccion = async (req, res = response) => {
    // Realizando la búsqueda:
    const tabla = req.params.tabla; // Requiere el parámetro de la colección
    const busqueda = req.params.busqueda; // Resquiere el parámetro de búsqueda
    const regex = new RegExp(busqueda, 'i'); // Declarando expresión regular de búsqueda insensible.
    
    const termino = tabla; // Captura el término ingresado 
    let data = []; // Define la variable 'data' como un arreglo

    // Determina las URL válidas
    const validURL = {
        medicos: '/api/search/collection/doctors',
        hospitales: '/api/search/collection/doctors',
        usuarios: '/api/search/collection/users'
    }

    // Criterio de búsquedas
    switch (tabla) {
        // Búsqueda de medicos
        case 'doctors':
            data = await Medico.find({nombre: regex})
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
        break;
        // Búsqueda de hospitales
        case 'hospitals':
            data = await Hospital.find({nombre: regex})
                .populate('usuario', 'nombre img');
        break;
        // Búsqueda de usuarios
        case 'users':
            data = await Usuario.find({nombre: regex});
        break;
        default: // Si no exite la declaración de los casos anteriores, entonces...
            return res.status(406).json({ // Retorna el estado de petición
                ok: false, // Busqueda fallida... 
                msg: `El término "${termino}" no existe o no es válida, las URL correctas son: ${validURL.medicos}, ${validURL.hospitales}, ${validURL.usuarios}`
            }); // Imprime el mensaje de error
    }

    // Respuesta de la petición:
    res.json({
        ok: true, // Búsqueda exitosa!!!
        resultados: data // Imprime información buscada
    });
}

// Exportaciones
module.exports = {
    obtenerBusquedaTotal,
    obtenerDocumentosColeccion
}