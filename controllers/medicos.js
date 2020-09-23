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

// Controlador para obtener un Médico mediante el ID desde el URL
const obtenerMedicoPorId = async (req, res) => {
    // Requiere el ID del médico seleccionado
    const id = req.params.id;

    try {
        // Listando los médicos registrados
        const medico = await Medico.findById(id) // Busca los médicos registados
            .populate('usuario', 'nombre img') // Imprime que usuario lo creo
            .populate('hospital', 'nombre img') // Imprime el hospital al que pertenece

        // Respuesta de la petición:
        res.json({
            ok: true, // Listado exitoso!!!
            medico // Obteniendo lista de médicos regitrados en la Base de Datos
        });  
    } catch (error) {
        // Respuesta de la petición:
        res.json({
            ok: false, // Listado fallido...
            msg: 'Hable con el administrador...' // Mensaje de error
        });  
    }
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
const actualizarMedico = async(req, res) => {
    // Requiere el ID del médico a actualizar:
    const id = req.params.id; // ID del médico
    const userID = req.userID; // ID del usuario que actualiza

    // Promesa...
    try {
        // Actualizando el nombre de un médico
        const medico = await Medico.findById(id); // Busca un médico mediante ID
        if (!medico) { // Si no existe el médico solicitado, entonces...
            return res.status(404).json({ // Muestra el estado de la petición...
                ok: false,
                msg: 'Médico no encontrado, proporcione una ID válida'
            }); // Retorna mensaje de error.
        }

        // Si existe el médico, entonces...
        const cambiosMedico = { ...req.body, usuario: userID} ; // Extrae el nombre proporcionado
        // ...Guarda los cambios en al base de datos
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        // ...Muestra el resultado de la petición
        res.json({
            ok: true,
            msg: 'Medico actualizado exitosamente!!!',
            'Datos nuevos del Médico': medicoActualizado
        });
    } catch (error) { // Si no se puede actualizar el médico, entonces:
        console.log(error); // ...Imprime el error en consola
        res.status(500).json({ // ...Muestra el estado de la petición
            ok: false,
            msg: 'Hable con el administrador...'
        }); // ... Muestra el mensaje de error
    }
}

// Controlador para eliminar un hospital
const borrarMedico = async(req, res) => {
    // Requiere el ID del médico a actualizar:
    const id = req.params.id; // ID del médico

    // Promesa...
    try {
        // Actualizando el nombre de un médico
        const medico = await Medico.findById(id); // Busca un médico mediante ID
        if (!medico) { // Si no existe el médico solicitado, entonces...
            return res.status(404).json({ // Muestra el estado de la petición...
                ok: false,
                msg: 'Médico no encontrado, proporcione una ID válida'
            }); // Retorna mensaje de error.
        }

        await Medico.findByIdAndDelete(id);

        // ...Muestra el resultado de la petición
        res.json({
            ok: true,
            msg: 'Médico eliminado exitosamente!!!',
            '¿Quién se retiró?': {
                Nombre: medico.nombre,
                ID: medico.id
            }
        });
    } catch (error) { // Si no se puede actualizar el médico, entonces:
        console.log(error); // ...Imprime el error en consola
        res.status(500).json({ // ...Muestra el estado de la petición
            ok: false,
            msg: 'Hable con el administrador...'
        }); // ... Muestra el mensaje de error
    }
}

// Exportaciones
module.exports = {
    obtenerMedico,
    obtenerMedicoPorId,
    crearMedico,
    actualizarMedico,
    borrarMedico
}