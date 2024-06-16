/*---------- Vista de Administrador ----------*/


var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["paquete"] = document.getElementById("package").value;
    formData["precio"] = document.getElementById("price").value;
    formData["fechaEntrega"] = document.getElementById("deliveryDate").value;
    formData["aproxPiezas"] = document.getElementById("pieces").value;
    formData["tiempoImpresion"] = document.getElementById("printTime").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("orderList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.paquete;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.precio;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.fechaEntrega;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.aproxPiezas;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.tiempoImpresion;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = '<a onClick="onEdit(this)">[Editar]</a> <a onClick="onDelete(this)">[Eliminar]</a>';
}

function resetForm() {
    document.getElementById("package").value = "";
    document.getElementById("price").value = "";
    document.getElementById("deliveryDate").value = "";
    document.getElementById("pieces").value = "";
    document.getElementById("printTime").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("package").value = selectedRow.cells[0].innerHTML;
    document.getElementById("price").value = selectedRow.cells[1].innerHTML;
    document.getElementById("deliveryDate").value = selectedRow.cells[2].innerHTML;
    document.getElementById("pieces").value = selectedRow.cells[3].innerHTML;
    document.getElementById("printTime").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.paquete;
    selectedRow.cells[1].innerHTML = formData.precio;
    selectedRow.cells[2].innerHTML = formData.fechaEntrega;
    selectedRow.cells[3].innerHTML = formData.aproxPiezas;
    selectedRow.cells[4].innerHTML = formData.tiempoImpresion;
}

function onDelete(td) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById("orderList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;

    if (document.getElementById("package").value == "") {
        isValid = false;
        document.getElementById("packageValidationError").classList.remove("ocultar");
    } else {
        document.getElementById("packageValidationError").classList.add("ocultar");
    }

    if (document.getElementById("price").value == "") {
        isValid = false;
        document.getElementById("priceValidationError").classList.remove("ocultar");
    } else {
        document.getElementById("priceValidationError").classList.add("ocultar");
    }

    if (document.getElementById("deliveryDate").value == "") {
        isValid = false;
        document.getElementById("deliveryDateValidationError").classList.remove("ocultar");
    } else {
        document.getElementById("deliveryDateValidationError").classList.add("ocultar");
    }

    if (document.getElementById("pieces").value == "") {
        isValid = false;
        document.getElementById("piecesValidationError").classList.remove("ocultar");
    } else {
        document.getElementById("piecesValidationError").classList.add("ocultar");
    }

    if (document.getElementById("printTime").value == "") {
        isValid = false;
        document.getElementById("printTimeValidationError").classList.remove("ocultar");
    } else {
        document.getElementById("printTimeValidationError").classList.add("ocultar");
    }

    return isValid;
}



