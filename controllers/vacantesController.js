//Declaramos modelo
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nuevaVacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    })
}

//Agrega las vacantes a la DB y nos redirecciona a la publicación
exports.agregarVacante = async(req,res) => {
    const vacante = new Vacante(req.body);

    //Crear array de skills
    vacante.skills = req.body.skills.split(',');
    
    //Almacenar en DB
    const nuevaVacante = await vacante.save();

    //Redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`);
}

//Mostrar una vacante
exports.mostrarVacante = async(req, res, next) => {
    const vacante = await Vacante.findOne({url: req.params.url}).lean();

    //Si no hay resultados
    if(!vacante) return next();

    //Si lo hay
    res.render('vacante', {
        vacante,
        nombrePagina: vacante.titulo,
        barra:true
    })
}

//Editar vacantes - Get
exports.formEditarVacante = async(req, res, next) =>{
    const vacante = await Vacante.findOne({url: req.params.url}).lean();

    //Si no existe
    if(!vacante) return next();

    //Si existe
    res.render('editarVacante', {
        vacante,
        nombrePagina: `Editar - ${vacante.titulo}`
    })
}

//Editar vacante - Post
exports.editarVacante = async(req, res) => {
    const vacanteActualizada = req.body;

    vacanteActualizada.skills = req.body.skills.split(',');

    const vacante = await Vacante.findOneAndUpdate({url: req.params.url},
    vacanteActualizada, {
        new: true,
    });

    res.redirect(`/vacantes/${vacante.url}`)
}