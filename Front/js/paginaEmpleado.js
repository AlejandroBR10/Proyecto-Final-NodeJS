window.onload = init;

function init(){
    returnToIndex();
       
}

function returnToIndex(){
    const logOut = document.getElementById("btn-logout");
    logOut.addEventListener('click', () => {
        window.location.href = "index.html"
    })
}








