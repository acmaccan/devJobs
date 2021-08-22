//]Importamos
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

//Creamos el esquema de la DB
//Mongoose trabaja con singleton (instancia única)
const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, //En caso de mongoose no es validador, en Sequelize sí
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true // Este sí es validador
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: String,
    expira: Date
});

//Método para hashear passwords
//El pre en mongoose reemplaza a los hooks de sequelize
usuariosSchema.pre('save', async function(next) {
    //Si el pass ya está hasheado
    if(!this.isModified('password')){
        return next();
    }
    //Si no está hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

//Si hay intento de registro de usuario que ya existe
//Recibimos un error por consola de duplicate key
usuariosSchema.post('save', function(error, doc, next){
    if(error.name === 'MongoError' && error.code === 11000){ //Identificamos de donde proviene el error
        next('Ese correo ya está registrado');
    } else {
        next(error); //Sigan mostrándose otros errores
    }
});

//Autenticar usuarios con Mongoose
usuariosSchema.methods = {
    compararPassword: function(password){
        return bcrypt.compareSync(password, this.password);
    }
}

//Exportar
module.exports = mongoose.model('Usuarios', usuariosSchema);