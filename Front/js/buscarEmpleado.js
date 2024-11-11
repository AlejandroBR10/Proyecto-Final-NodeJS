window.onload = init;

function init(){
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "home.html"
    });
        document.querySelector('.btn-primary').addEventListener('click', buscarEmpleado);
    
}

function buscarEmpleado(){
    console.log("Prueba de testeo de boton");
    var nombre = document.getElementById('input-name').value;

    console.log(nombre);
    


    axios({
        method: 'get',
        url: `http://localhost:3000/admin/${nombre}`,
    }).then(function(res) {
        console.log(res);
        alert("Busqueda Exitosa");
        window.location.href = "buscarEmpleadoHome.html";
    }).catch(function(err) {
        console.log(err);
    })
}