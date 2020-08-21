// Importaciones
const { Schema, model } = require('mongoose');

// Esquema del Médico
const MedicoSchema = Schema({
    nombre: { // Nombre (obligatorio)
        type: String,
        required: true
    },
    img: { // Imagen del perfil de Usuario (opcional)
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

// Exportaciones
module.exports = model('Medico', MedicoSchema);