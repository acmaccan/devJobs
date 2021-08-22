//Declaramos modelo
const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const express = require('express-validator');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crea tu cuenta en devJobs',
        tagline: 'Es gratis, sólo necesitas crear tu cuenta'
    })
}

exports.validarRegistro = (req, res, next) => {
    //Sanitizar campos
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('confirmar').escape();

    //Validar campos
    req.checkBody('nombre', 'El nombre es obligatorio').notEmpty();
    req.checkBody('email', 'El email debe ser válido').esEmail();
    req.checkBody('password', 'El password es obligatorio').notEmpty();
    req.checkBody('confirmar', 'Es necesario que confirmes tu password').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    //Si hay errores se guardan aquí
    const errores = req.validationErrors();

    //Y se van a ver aquí
    if(errores){
        //Si hay errores
        req.flash('error', errores.map(error => error.msg));
        
        res.render('crearCuenta', {
            nombrePagina: 'Crea tu cuenta en devJobs',
            tagline: 'Es gratis, sólo necesitas crear tu cuenta',
            mensajes: req.flash()
        });
        return
    }
    //Si la validación es correcta
    next();
}

exports.crearUsuario = async(req, res, next) => {
    //Crear usuario
    const usuario = new Usuarios(req.body); 
    
    //Si es nuevo usuario
    const nuevoUsuario = await usuario.save();
    
    try{
        //Si nuevo usuario se registra, se guarda
        await usuario.save();
        //Y se redirige
        res.redirect('/iniciarSesion');
    } catch (error){
        //Si no es nuevo usuario y el mail ya está registrado 
        //llama al middleware en el modelo Usuarios
        req.flash('error', error);
    }  

}

//Formulario para iniciar sesión
exports.formIniciarSesion = (req, res) => {
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión devJobs'
    })
}
