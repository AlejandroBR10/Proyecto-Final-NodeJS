window.onload = init;

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "home.html"
    });
    const btnEnviar = document.getElementById("enviarForm");
    btnEnviar.addEventListener('click', delete_empleado);

}

function delete_empleado(e){
        const id = document.getElementById("ID_deleteUser").value;
        const email = document.getElementById("email_deleteUser").value;
        const clave = document.getElementById("clave_deleteUser").value;
        e.preventDefault(); 
        let url = `http://localhost:3000/admin/${id}/${email}/${clave}`
        console.log(url);
        axios.delete(url
        ).then(function (res) {
            console.log(res);
            alert("Empleado eliminado exitosamente");
            window.location.href = "login.html";
        }).catch(function (err) {
            console.log(err);
        });
    }
