window.onload = init;

function init(){
    localStorage.removeItem("token");
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "login.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', modificar);
    }
    else{
        window.location.href = "home.html";
    }
}

function modificar(){
    console.log("Prueba de testeo de boton");
    var id = document.getElementById('input-id').value;
    var nombre = document.getElementById('input-name').value;
    var apellidos = document.getElementById('input-lastname').value;
    var telefono = document.getElementById('input-phone').value;
    var correo = document.getElementById('input-mail').value;
    var direccion = document.getElementById('input-address').value;
    var clave = document.getElementById('input-password').value;
    console.log(id+nombre+apellidos+telefono);



    axios({
        method: 'put',
        url: 'http://localhost:3000/admin/modify/${id}',
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
        alert("Actualizacion exitosa");
        window.location.href = "login.html";
    }).catch(function(err) {
        console.log(err);
    })
}