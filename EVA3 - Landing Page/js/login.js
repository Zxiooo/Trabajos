/*---------- Login ----------*/

function validarLogin() {
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;
    
    if (usuario == '' || contraseña == '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (usuario === "admin" && contraseña === "admin") {
        window.location.href = "../html/admin.html";
    } else {
        window.location.href = "../html/catalogo.html";
    }
}
