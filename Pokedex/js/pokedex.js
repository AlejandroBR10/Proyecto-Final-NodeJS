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


function displayEmpleado(empleado){
    var body = document.querySelector("body");
    for(var i = 0; i < empleado.length; i++){
        body.innerHTML += `<h3>${empleado[i].nombre}</h3>`;
    }
}