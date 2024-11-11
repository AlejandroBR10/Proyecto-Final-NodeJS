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

    axios({
        method: 'get',
        url: `http://localhost:3000/admin/${nombre}`,
    }).then(function(res) {
        console.log(res.data.message);
        alert("Busqueda Exitosa");
        displayEmpleado(res.data.message)
        //window.location.href = "buscarEmpleadoHome.html";
    }).catch(function(err) {
        alert("No se ha encontrado al usuario")
        console.log(err);
    })
}

function displayEmpleado(empleado) {
    var body = document.querySelector("body");

    body.innerHTML = `
    <h2 class="text-center mt-4">Datos del empleado</h2>
    <div class="d-flex justify-content-center align-items-center" style="min-height: 70vh;">
        <table class="table table-striped table-bordered table-hover w-75">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Dirección</th>
                </tr>
            </thead>
            <tbody id="empleados-body">
            </tbody>
        </table>
    </div>
    <div class="text-center mt-4">
        <a href="home.html" class="btn btn-primary">Regresar a Inicio</a>
    </div>`;

    var tableBody = document.getElementById("empleados-body");

    if( empleado.length > 1 ){
     for(let i = 0; i < empleado.length; i++){
        tableBody.innerHTML += `
        <tr>
            <td>${empleado[i].id_empleado}</td>
            <td>${empleado[i].nombre}</td>
            <td>${empleado[i].apellidos}</td>
            <td>${empleado[i].correo}</td>
            <td>${empleado[i].telefono}</td>
            <td>${empleado[i].direccion}</td>
        </tr>`;
     }   
    }else{
        tableBody.innerHTML += `
        <tr>
            <td>${empleado.id_empleado}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellidos}</td>
            <td>${empleado.correo}</td>
            <td>${empleado.telefono}</td>
            <td>${empleado.direccion}</td>
        </tr>`;
    }

   
}


