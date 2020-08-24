// Importaciones
const mongoose = require('mongoose');

// Promesa de conexión a MongoDB
const dbConnection = async () => {

    try {
        await mongoose.connect('mongodb+srv://azbel:VsMhBuAMtsx5N6G6@cluster0.v2wru.mongodb.net/hospitaldb',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('DB Online'); // Mensaje de conexión exitosa!!!
    } catch(err) {
        console.log(err);
        throw new Error('Error al iniciar la Base de Datos, ver "logs"') // Mensaje de error...
    }

}

// EnsureIndex Solition
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Modulos exportados
module.exports = {
    dbConnection
}