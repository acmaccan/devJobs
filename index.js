//Importamos Mongoose
const mongoose = require('mongoose');
require('./config/db');

//Importamos express
const express = require('express');

//Importamos Handlebars
const exphbs = require('express-handlebars');

//Importamos path - Para usar la carpeta public
const path = require('path');

//Importamos router
const router = require('./routes');

//Importar cookie parser, session y sotre de Mongo - Para mantener sesión entre páginas
//El session entre paréntesis es para pasar datos a al paquete del store
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//Importamos Body Parser
const bodyParser = require('body-parser');

//Importamos express validator
//const expressValidator = require('express-validator');

//Importamos connect flash
const flash = require('connect-flash');

//Importar passport
const passport = require('./config/passport');

//Importamos servicio para leer variables.env
require('dotenv').config({path: 'variables.env'});

//Creamos app
const app = express();

//Habilitar Body Parser - Deprecated
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Habilitar express validator
//app.use(expressValidator());

//Handlebars disponible
app.engine('handlebars',
    exphbs({
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
    })
);
app.set('view engine', 'handlebars');

//Archivos estáticos disponibles
app.use(express.static(path.join(__dirname, 'public')));

//Accedemos y configuramos a cookies y sesión
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.DATABASE
    })
}));

//Inicializar passport
app.use(passport.initialize());
app.use(passport.session);

//App disponible antes de creado el router
/*app.use('/', (req, res) => {
    res.send('Funciona');
})*/

//Habilitar flash messages
app.use(flash());

//Crear nuestro middleware de mensajes
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

//App disponible luego de creado el router
app.use('/', router());

//Escuchamos puerto
//app.listen(5000);
app.listen(process.env.PORT);