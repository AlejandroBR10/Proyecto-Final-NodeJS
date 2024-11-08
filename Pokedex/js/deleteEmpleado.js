window.onload = init;

function init() {
    const btnEnviar = document.getElementById("enviarForm");
    btnEnviar.addEventListener('click', (e) => {
        const id = document.getElementById("ID_deleteUser").value;
        const email = document.getElementById("email_deleteUser").value;
        const clave = document.getElementById("clave_deleteUser").value;
        console.log(id, email, clave, btnEnviar);
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
    });
}

/*
        axios({
            method: 'delete',
            url: 'http://localhost:3000/admin',
            data: {
                id: id,
                correo: email,
                clave: clave
            }
        }).then(function(res) {
            console.log(res);
            alert("Empleado eliminado exitosamente");
            window.location.href = "login.html";
        }).catch(function(err) {
            console.log(err);
        })
    })

*/