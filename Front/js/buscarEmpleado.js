window.onload = init;

function init(){
        document.querySelector('.btn-primary').addEventListener('click', modificar);
    
}







function loadEmpleado(){
    axios.get(url + "/empleado", headers).then(function(res) {
        console.log(res);
        displayEmpleado(res.data.message);
        
    }).catch(function(err) {
        console.log(err);
    })
    .finally(function(){
        console.log("Solicitud completada");
    })
}

//Botones de agregar, modificar eliminar y buscar





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
function init(){
    document.querySelector('.btn-primary').addEventListener('click', modificar);

}

function buscarEmpleado(){
console.log("Prueba de testeo de buscar empleado");

var name = document.getElementById("search-input").value.toLowerCase();

console.log(nombre);



axios({
    method: 'get',
    url: `http://localhost:3000/admin/${name}`

}).then(function(res) {
    console.log(res);
    alert("Busqueda exitosa");
    window.location.href = "buscarEmpleado.html";
}).catch(function(err) {
    console.log(err);
})
}