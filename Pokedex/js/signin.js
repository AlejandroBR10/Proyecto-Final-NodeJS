window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "login.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }
    else{
        window.location.href = "pokedex.html";
    }
}

function signin(){
    var nombre = document.getElementById('input-name').value;
    var apellidos = document.getElementById('input-lastname').value;
    var telefono = document.getElementById('input-phone').value;
    var correo = document.getElementById('input-mail').value;
    var direccion = document.getElementById('input-address').value;
    var password = document.getElementById('input-password').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/empleado/signin',
        data: {
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            correo: correo,
            direccion: direccion,
            clave: password
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "login.html";
    }).catch(function(err) {
        console.log(err);
    })
}