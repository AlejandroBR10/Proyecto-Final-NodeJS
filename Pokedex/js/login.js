window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "signin.html"
    });

    document.querySelector('.btn-primary').addEventListener('click', login)
}
else{
    window.location.href = "pokedex.html";
}
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    console.log(mail, pass);

    axios({
        method: 'post',
        url: 'http://localhost:3000/empleado/login',
        data: {
            correo: mail,
            clave: pass
        }
    }).then(function(res) {
        console.log(res);
        if(res.data.code === 200){
            window.location.href = "pokedex.html";
            localStorage.setItem("token", res.data.message);
            alert("Inicio exitoso");
        }
        else{
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err) {
        console.log(err);
    })
}