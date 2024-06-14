var carrito = [];
var total = 0;

function anadirAlCarrito(nombreProducto, precioProducto) {
    var encontrado = false;
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre == nombreProducto) {
            carrito[i].cantidad++;
            carrito[i].precioTotal += precioProducto;
            encontrado = true;
            break;
        }
    }
    if (!encontrado) {
        var item = {
            nombre: nombreProducto,
            precioUnitario: precioProducto,
            cantidad: 1,
            precioTotal: precioProducto
        };
        carrito.push(item);
    }
    total += precioProducto;
    actualizarCarrito();
}

function actualizarCarrito() {
    var itemsCarrito = document.getElementById('itemsCarrito');
    itemsCarrito.innerHTML = '';  // Limpiar la lista existente de artículos del carrito

    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];
        var li = '<li>' + item.nombre + ' - $' + item.precioTotal + ' (' + item.cantidad + ')' +
                 ' <button onclick="anadirAlCarrito(\'' + item.nombre + '\', ' + item.precioUnitario + ')"><i class="fa fa-plus"></i></button>' +
                 ' <button onclick="eliminarDelCarrito(' + i + ')"><i class="fa fa-minus"></i></button></li>';
        itemsCarrito.innerHTML += li;
    }

    document.getElementById('total').textContent = total;  // Actualizar el total
    document.getElementById('botonComprar').disabled = carrito.length == 0;  // Habilitar o deshabilitar el botón de comprar
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precioUnitario;
    carrito[index].cantidad--;
    carrito[index].precioTotal -= carrito[index].precioUnitario;
    if (carrito[index].cantidad == 0) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

function comprar() {
    if (carrito.length == 0) return;

    var contenidoComprobante = document.getElementById('contenidoComprobante');
    var textoComprobante = '<p>Fecha: ' + new Date().toLocaleString() + '</p><ul>';
    
    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];
        textoComprobante += '<li>' + item.nombre + ' - $' + item.precioTotal + ' (' + item.cantidad + ')</li>';
    }

    textoComprobante += '</ul><p>Total: $' + total + '</p>';
    contenidoComprobante.innerHTML = textoComprobante;

    document.getElementById('comprobante').style.display = 'block';

    carrito = [];
    total = 0;
    actualizarCarrito();
}

function cerrarComprobante() {
    document.getElementById('comprobante').style.display = 'none';
}
