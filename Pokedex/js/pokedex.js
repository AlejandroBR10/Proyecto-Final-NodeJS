window.onload = init;
var headers = {};
var url = "http://localhost:3000"

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
const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", buscarEmpleado);

function returnToIndex(){
    const logOut = document.getElementById("btn-logout");
    logOut.addEventListener('click', () => {
        window.location.href = "index.html"
    })
}


function loadEmpleado(){
    axios.get(url + "/empleado", headers).then(function(res) {
        console.log(res);
        displayEmpleado(res.data.message);
        returnToIndex();
        
    }).catch(function(err) {
        console.log(err);
    })
    .finally(function(){
        console.log("Solicitud completada");
    })
}

//Botones de agregar, modificar eliminar y buscar

function displayEmpleado(empleado) {
    var body = document.querySelector("body");
    for (var i = 0; i < empleado.length; i++) {
        body.innerHTML += `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h3>${empleado[i].nombre} ${empleado[i].apellidos}</h3>
            <div>
                <button type="button" class="btn btn-success">Agregar</button>
                <button type="button" class="btn btn-warning">Modificar</button>
                <button type="button" class="btn btn-danger">Eliminar</button>
            </div>
        </div>`;
    }
}

