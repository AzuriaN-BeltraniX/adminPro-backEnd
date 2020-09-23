// Importaciones
const { response } = require('express');

const Hospital = require('../models/hospitales');

// Controlador para listar los Hospitales registrados
const obtenerHospital = async (req, res) => {
    // Obteniendo los hospitales:
    const hospitales = await Hospital.find() // Busca los hospitales
        .populate('usuario', 'nombre role') // Muestra todos los datos del usuario que hizo el registro.

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
            msg: 'Hable con el administrador, o verifique inicio de sesión...'
        }); // Muestra el mensaje de error
    }
}

// Controlador para actualizar un hospital
const actualizarHospital = async (req, res) => {
    // Requiere el ID del hospital a actualizar:
    const id = req.params.id; // ID del hospital
    const userID = req.userID; // ID del usuario que actualiza

    // Promesa...
    try {
        // Actualizando el nombre de un Hospital
        const hospital = await Hospital.findById(id); // Busca un hospital mediante ID
        if (!hospital) { // Si no existe el hospital solicitado, entonces...
            return res.status(404).json({ // Muestra el estado de la petición...
                ok: false,
                msg: 'Hospital no encontrado, proporcione una ID válida'
            }); // Retorna mensaje de error.
        }

        // Si existe el hospital, entonces...
        const cambiosHospital = { ...req.body, usuario: userID} ; // Extrae el nombre proporcionado
        // ...Guarda los cambios en al base de datos
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        // ...Muestra el resultado de la petición
        res.json({
            ok: true,
            msg: 'Hospital actualizado exitosamente!!!',
            'Datos nuevos del Hospital': hospitalActualizado
        });
    } catch (error) { // Si no se puede actualizar el hospital, entonces:
        console.log(error); // ...Imprime el error en consola
        res.status(500).json({ // ...Muestra el estado de la petición
            ok: false,
            msg: 'Hable con el administrador...'
        }); // ... Muestra el mensaje de error
    }
}

// Controlador para eliminar un hospital
const borrarHospital = async (req, res) => {
    // Requiere el ID del hospital a actualizar:
    const id = req.params.id; // ID del hospital

    // Promesa...
    try {
        // Borrando un Hospital:
        const hospital = await Hospital.findById(id); // Busca un hospital mediante ID
        if (!hospital) { // Si no existe el hospital solicitado, entonces...
            return res.status(404).json({ // Muestra el estado de la petición...
                ok: false,
                msg: 'Hospital no encontrado, proporcione un ID válido'
            }); // Retorna mensaje de error.
        }

        // Si exite el hospital, entonces...
        await Hospital.findByIdAndDelete(id); // Borra el hospital seleccionado
 
        // ...Muestra el resultado de la petición
        res.json({
            ok: true,
            msg: 'Hospital borrado exitosamente!!!',
            '¿Cuál se eliminó?': {
                nombre: hospital.nombre,
                id: hospital.id
            }
        });
    } catch (error) { // Si no se puede borrar el hospital, entonces:
        console.log(error); // ...Imprime el error en consola
        res.status(500).json({ // ...Muestra el estado de la petición
            ok: false,
            msg: 'Hable con el administrador...'
        }); // ... Muestra el mensaje de error
    }
}

// Exportaciones
module.exports = {
    obtenerHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}