window.onload = init;
var headers = {};
var url = "http://localhost:3000"
var empleados = [];

function init(){
    if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmpleado();
    }else{
        window.location.href = "index.html";
    }
}

function returnToIndex(){
    const logOut = document.getElementById("btn-logout");
    logOut.addEventListener('click', () => {
        window.location.href = "index.html"
    })
}

function actualizarEmpleado(){
    const actualizar = document.getElementById("btn-modificarEmpleado");
    actualizar.addEventListener('click', () => {
        window.location.href = "modifyEmpleado.html"
    })
}



function loadEmpleado(){
    axios.get(url + "/empleado", headers).then(function(res) {
        console.log(res);
        displayEmpleado(res.data.message);
        buscarEmpleado();
        //HANDLERS DE LOS BOTONES DE LA PAGINA
        returnToIndex();
        add_Empleado();
        delete_Empleado();
        actualizarEmpleado();
        
    }).catch(function(err) {
        console.log(err);
    })
    .finally(function(){
        console.log("Solicitud completada");
    })
}

//Botones de agregar, modificar eliminar y buscar

function add_Empleado(){
    const btn_add_empleado = document.getElementById("btn-agregarEmpleado");
    btn_add_empleado.addEventListener('click', () => {
        window.location.href = "insertarEmpleado.html"
    })
}

function delete_Empleado(){
    const btn_del_empleado = document.getElementById("btn-eliminarEmpleado");
    btn_del_empleado.addEventListener('click', () => {
        window.location.href = "deleteEmpleado.html"
    })
}
//Listar empleados en una tabla
function displayEmpleado(empleado) {
    var body = document.querySelector("body");


    body.innerHTML += `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 70vh;">
        <table border="1" style="width: 90%; text-align: left; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                </tr>
            </thead>
            <tbody id="empleados-body">
            </tbody>
        </table>
    </div>`;

    var tableBody = document.getElementById("empleados-body");

    for (var i = 0; i < empleado.length; i++) {
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
}
function buscarEmpleado(){
    const btn_buscar = document.getElementById("btn-buscarEmpleado");
    btn_buscar.addEventListener('click', () => {
        window.location.href = "buscarEmpleado.html"
    });

}




