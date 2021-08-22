//Importamos express
const express = require('express');

//Creamos router
const router = express.Router();

//Importamos controllers
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

//Router disponible
module.exports = () => {

    //Home
    router.get('/', homeController.mostrarTrabajos);

    //Vacantes
    router.get('/vacantes/nuevaVacante', vacantesController.formularioNuevaVacante);
    router.post('/vacantes/nuevaVacante', vacantesController.agregarVacante);

    //Mostrar vacante
    router.get('/vacantes/:url', vacantesController.mostrarVacante);

    //Editar vacante
    router.get('/vacantes/editar/:url', vacantesController.formEditarVacante);
    router.post('/vacantes/editar/:url', vacantesController.editarVacante);

    //Crear cuentas
    router.get('/crearCuenta', usuariosController.formCrearCuenta);
    router.post('/crearCuenta', 
        usuariosController.validarRegistro,
        usuariosController.crearUsuario
    );
    
    //Autenticar usuarios
    router.get('/iniciarSesion', usuariosController.formIniciarSesion);
    router.post('/iniciarSesion', authController.autenticarUsuario);

    //Panel de administración
    router.get('/administracion', authController.mostrarPanel);

    //Retornar router sino no funciona
    return router;
}