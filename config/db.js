const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

//Configuración ODM Mongoose
mongoose.connect(process.env.DATABASE, 
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    });
mongoose.connection.on('error', (error) => {
    console.log(error);
});

//Importar modelos de datos
require('../models/Usuarios');
require('../models/Vacantes');