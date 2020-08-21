// Importaciones
const { response } = require('express');

const Medico = require('../models/medicos');

// Controlador para listar los Médicos registrados
const obtenerMedico = async (req, res) => {
    // Listando los médicos registrados
    const medicos = await Medico.find() // Busca los médicos registados
        .populate('usuario', 'nombre img') // Imprime que usuario lo creo
        .populate('hospital', 'nombre img') // Imprime el hospital al que pertenece

    // Respuesta de la petición:
    res.json({
        ok: true, // Listado exitoso!!!
        medicos // Obteniendo lista de médicos regitrados en la Base de Datos
    });
}

// Controlador para crear un Médico
const crearMedico = async (req, res) => {
    // Registrando un médico:
    const userID = req.userID; // Requiere el ID del usuario logueado
    const medico = new Medico({
        usuario: userID,
        ...req.body
    }); // Crea el médico

    // Promesa...
    try {
        // Si el ID de usuario es válido, y la creación es correcta, entonces...
        const medicoDB = await medico.save(); // Guarda el médico en la Base de Datos.

        // Impirme el resultado de la petición
        res.json({
            ok: true, // Registro exitoso!!!
            medico: medicoDB // Muestra el médico registrado.
        });
    } catch (error) { // Si no se pudo guardar el nuevo médico, entonces...
        console.log(error); // Imprime el error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        }); // Muestra el mensaje de error
    }
}

// Controlador para actualizar un Médico
const actualizarMedico = (req, res) => {
    // Prueba de data
    res.json({
        ok: true,
        msg: 'actualizarMedico is working!!!'
    });
}

// Controlador para eliminar un hospital
const borrarMedico = (req, res) => {
    // Prueba de data
    res.json({
        ok: true,
        msg: 'borrarMedico is working!!!'
    });
}

// Exportaciones
module.exports = {
    obtenerMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}