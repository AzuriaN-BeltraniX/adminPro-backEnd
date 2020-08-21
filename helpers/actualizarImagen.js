// Importaciones
const fs = require('fs');

const Medico = require('../models/medicos');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospitales');

// Borrando imágenes
const borrarImagen = (path) => {
    // ...Si existe el path anterior,, si sí existe una imagen, entonces...
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    } // Bórralo
}

// Asignando a usuario la imagen
const actualizarImagen = async (tipo, id, nomArchivo) => {
    let pathViejo = '';

    // Evaluando el tipo
    switch (tipo) {
        case 'doctors': 
            // Verifica si el tipo es un Médico mediante un ID:
            const medico = await Medico.findById(id);
            if (!medico) { // Si el ID no pertenece a un médico, entonces...
                console.log('No se encontró un médico por ID'); // Imprime mensaje,
                return false; // Retorna un valor falso
            }

            // Si el médico ya tiene una imagen asignada, entonces elimina la anterior:
            pathViejo = `./uploads/doctors/${medico.img}`; // Captura el archivo...
            borrarImagen(); // Borra la imagen.

            // Captura el nombre y actualiza el archivo:
            medico.img = nomArchivo; // Determina la ubicación del nombre del archivo...
            await medico.save(); // Guarda la nueva imagen el Base de Datos..
            return true; // Subida Exitosa!!!
        break;

        case 'hospitals': 
            // Verifica si el tipo es un Hospital mediante un ID:
            const hospital = await Hospital.findById(id);
            if (!hospital) { // Si el ID no pertenece a un hospital, entonces...
                console.log('No se encontró un hospital por ID'); // Imprime mensaje,
                return false; // Retorna un valor falso
            }

            // Si el hospital ya tiene una imagen asignada, entonces elimina la anterior:
            pathViejo = `./uploads/hospitals/${hospital.img}`; // Captura el archivo...
            borrarImagen(); // Borran la imagen.

            // Captura el nombre y actualiza el archivo
            hospital.img = nomArchivo; // Determina la ubicación del nombre del archivo
            await hospital.save(); // Guarda la nueva imagen el Base de Datos
            return true; // Subida Exitosa!!!
        break;

        case 'users': 
            // Verifica si el tipo es un Usuario mediante un ID:
            const usuario = await Usuario.findById(id);
            if (!usuario) { // Si el ID no pertenece a un usuario, entonces...
                console.log('No se encontró un hospital por ID'); // Imprime mensaje,
                return false; // Retorna un valor falso
            }

            // Si el usuario ya tiene una imagen asignada, entonces elimina la anterior:
            pathViejo = `./uploads/hospitals/${usuario.img}`; // Captura el archivo...
            borrarImagen(); // Borra la imagen.

            // Captura el nombre y actualiza el archivo
            usuario.img = nomArchivo; // Determina la ubicación del nombre del archivo
            await usuario.save(); // Guarda la nueva imagen el Base de Datos
            return true; // Retorna un valor verdadero, que significa exitosa
        break;
    }

    /* Prueba de data
    console.log('actualizarImagen is working!!!');
    */
}

// Exportaciones
module.exports = {
    actualizarImagen
}