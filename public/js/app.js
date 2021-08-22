document.addEventListener('DOMContentLoaded', () => {
    //Selección de skills
    const skills = document.querySelector('.lista-conocimientos');

    //No en todos los templates existe
    if(skills) {
        skills.addEventListener('click', agregarSkills);

        //Cuando estamos en editar llamar la función
        skillsSeleccionados();
    }

    //Limpiar alertas
    let alertas = document.querySelector('alertas');

    //Si están activas
    if(alertas){
        limpiarAlertas();
    }
})

//Desarrollo selección de skills
const skills = new Set();

const agregarSkills = e => {
    if(e.target.tagName === 'LI'){
        if(e.target.classList.contains('activo')){
            //Si está quitarlo del set y desmarcar el botón
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
        } else{
            //Si no está agregarlo al set y marcar el botón
            skills.add(e.target.textContent);
            e.target.classList.add('activo');
        }
        const skillsArray = [...skills];
        document.querySelector('#skills').value = skillsArray;    
    } 
}
const skillsSeleccionados = () =>{
    const seleccionadas = Array.from(document.querySelectorAll('.activo'));

    seleccionadas.forEach(seleccionada => {
        skills.add(seleccionada.textContent);
    })

    //Inyectar en el hidden
    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;
}

//Desarrollo de limpiar alertas
const limpiarAlertas = () => {
    const alertas = document.querySelector('.alertas');
    const interval = setInterval(() => {
        if(alertas.children.lenght > 0) {
            alertas.removeChild(alertas.children[0]);
        } else if(alertas.children.length === 0){
            alertas.parentElement.removeChild(alertas);
            clearInterval(interval);
        }
    }, 2000);
}