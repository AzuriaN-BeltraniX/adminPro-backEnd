// Importaciones
const { response } = require('express');

const Hospital = require('../models/hospitales');

// Controlador para listar los Hospitales registrados
const obtenerHospital = async (req, res) => {
    // Obteniendo los hospitales:
    const hospitales = await Hospital.find() // Busca los hospitales
        .populate('usuario', 'nombre') // Muestra todos los datos del usuario que hizo el registro.

    // Imprimiendo al respuesta de la petición
    res.json({
        ok: true, // Listado exitoso
        hospitales // Lista de hospitales registrados
    });
}

// Controlador para registrar un hospital
const crearHospital = async (req, res) => {
    // Creando un hospital:
    const userID = req.userID; // Requiere el ID del usuario actual
    const hospital = new Hospital({
        usuario: userID,
        ...req.body
    }); // Requiere el usuario logueado para crear hospital y los datos ingresados en el BODY

    /* Prueba de data
        console.log(userID); // Imprime el usuario logeado
    */

    // Promesa...
    try {
        // Si hay datos, entonces guarda el hospital:
        const hospitalDB = await hospital.save();

        // Imprime el resultado de la petición
        res.json({
            ok: true, // Registro exitoso!!!
            hospital: hospitalDB // Nombre del hospital creado
        });
    } catch (error) { // Si no se puede guardar el hospital, entonces...
        console.log(error); // Imprime el error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador... '
        }); // Muestra el mensaje de error
    }
}

// Controlador para actualizar un hospital
const actualizarHospital = (req, res) => {
    // Prueba de data
    res.json({
        ok: true,
        msg: 'actualizarHospital is working!!!'
    });
}

// Controlador para eliminar un hospital
const borrarHospital = (req, res) => {
    // Prueba de data
    res.json({
        ok: true,
        msg: 'borrarHospital is working!!!'
    });
}

// Exportaciones
module.exports = {
    obtenerHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}