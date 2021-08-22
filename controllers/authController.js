const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/administracion',
    failureRedirect : '/iniciarSesion', 
    failureFlash: true,
    badRequestMessage : 'Ambos campos son obligatorios'
});

exports.mostrarPanel = (req, res) => {
    res.render('administracion', {
        nombrePagin: 'Panel de administración',
        tagline: 'Crea y administra tus vacantes desde aquí'
    })
}