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




function loadEmpleado(){
    axios.get(url + "/empleado", headers).then(function(res) {
        console.log(res);
        returnToIndex();
        
    }).catch(function(err) {
        console.log(err);
    })
    .finally(function(){
        console.log("Solicitud completada");
    })
}














