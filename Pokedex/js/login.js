window.onload = init;

function init(){

    
    const checkbox = document.getElementById('btn-admin');

   /* checkbox.addEventListener('click', () => {
        console.log("dentro del click");
        checkbox.checked = !checkbox.checked; 
    });*/
    checkbox.addEventListener('click', () => {
        console.log("dentro del click, estado del checkbox:", checkbox.checked);
    });

    localStorage.removeItem("token");
    if(!localStorage.getItem("token")){
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "signin.html"
    });

    

    document.querySelector('.btn-primary').addEventListener('click', login)
}
else{
    window.location.href = "home.html";
}
}

function login(){

    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    const checkbox = document.getElementById('btn-admin');
    





   // console.log(mail, pass);

    if(checkbox.checked){
        axios({
            method: 'post',
            url: 'http://localhost:3000/admin/login',
            data: {
                correo_electronico: mail,
                clave: pass
            }
        }).then(function(res) {
            console.log(res);
            if(res.data.code === 200){
                window.location.href = "home.html";
                localStorage.setItem("token", res.data.message);
                alert("Inicio exitoso");
            }
            else{
                alert("Usuario y/o contraseña incorrectos");
            }
        }).catch(function(err) {
            console.log(err);
        })
    }else{
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
                window.location.href = "home.html";
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
    
    


}