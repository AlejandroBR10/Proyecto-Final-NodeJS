window.onload = init;

function init(){
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "home.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', insertar);
    }
    

function insertar(){
    console.log("Prueba de testeo de boton");
    var nombre = document.getElementById('input-name').value;
    var apellidos = document.getElementById('input-lastname').value;
    var telefono = document.getElementById('input-phone').value;
    var correo = document.getElementById('input-mail').value;
    var direccion = document.getElementById('input-address').value;
    var clave = document.getElementById('input-password').value;



    axios({
        method: 'post',
        url: 'http://localhost:3000/empleado/signin',
        data: {
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            correo: correo,
            direccion: direccion,
            clave: clave
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "home.html";
    }).catch(function(err) {
        console.log(err);
    })
}