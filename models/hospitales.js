// Importaciones
const { Schema, model } = require('mongoose');

// Esquema de Usuario
const HospitalSchema = Schema({
    nombre: { // Nombre (obligatorio)
        type: String,
        required: true
    },
    img: { // Imagen del perfil de Usuario (opcional)
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
}, {collection: 'hospitales'});

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

// Exportaciones
module.exports = model('Hospital', HospitalSchema);