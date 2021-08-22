const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async(email, password, done) => {
        const usuario = await Usuarios.findOne({email});

        // Si no existe usuario
        if(!usuario) return done(null, false, {
            message: 'Usuario no existente'
        });

        // Si el usuario existe, verificar usuario
        const verificarPass = usuario.compararPasswords(password);
        if(!verificarPass) return done(null, false, {
            message: 'Password incorrecto'
        });
        
        // Si usuario existe y password es correcto
        return done(null, usuario);
}));

// Serialize y deserialize user
passport.serializeUser((usuario, done) => done(null, usuario._id));
passport.deserializeUser(async(id, done) => {
    const usuario = await Usuarios.findById(id).exec(); // Chequear si el findById está deprecado
    return done(null, usuario);
});

//Exportar módulo
module.exports = passport;