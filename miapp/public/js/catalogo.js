document.addEventListener('DOMContentLoaded', function () {
  const categoryList = document.getElementById('category-list');
  const productList = document.getElementById('product-list');
  const quitarFiltrosBtn = document.getElementById('quitar-filtros');
  const abrirCarritoBtn = document.getElementById('abrir-carrito');
  const itemsCarrito = document.getElementById('itemsCarrito');
  const totalPagar = document.getElementById('total');
  const botonComprar = document.getElementById('botonComprar');
  const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
  const cerrarComprobanteBtn = document.getElementById('cerrarComprobante');
  const contenidoComprobante = document.getElementById('contenidoComprobante');
  const fechaCompraSpan = document.getElementById('fechaCompra');

  let carrito = [];

  // Carga de productos y categorías
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // Función para cargar las categorías dinámicamente
  function cargarCategorias() {
    categoryList.innerHTML = '';
    categories.forEach(category => {
      const li = document.createElement('li');
      li.textContent = category;
      li.onclick = () => filtrarProductosPorCategoria(category);
      categoryList.appendChild(li);
    });
  }

  // Función para cargar todos los productos
  function cargarTodosLosProductos() {
    productList.innerHTML = '';
    products
      .filter(product => !product.onSale)
      .forEach(product => {
        const productDiv = crearProductoElemento(product);
        productList.appendChild(productDiv);
      });
  }

  // Función para filtrar productos por categoría
  function filtrarProductosPorCategoria(categoria) {
    productList.innerHTML = '';
    products
      .filter(product => product.category === categoria && !product.onSale)
      .forEach(product => {
        const productDiv = crearProductoElemento(product);
        productList.appendChild(productDiv);
      });
  }

  // Función auxiliar para crear elementos de producto
  function crearProductoElemento(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
      <h4>${product.name}</h4>
      <p>Precio: $${product.price}</p>
      <p>Categoría: ${product.category}</p>
      <div class="acciones-producto">
        <button class="anadir-carrito-btn" data-name="${product.name}" data-price="${product.price}">Añadir al Carrito</button>
      </div>
    `;
    return productDiv;
  }

  // Función para manejar el evento de añadir al carrito
  function manejarAñadirAlCarrito(event) {
    const name = event.target.dataset.name;
    const price = parseFloat(event.target.dataset.price);

    agregarAlCarrito(name, price);
  }

  // Función para agregar un producto al carrito
  function agregarAlCarrito(name, price) {
    const productoExistente = carrito.find(item => item.nombre === name);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre: name, precio: price, cantidad: 1 });
    }

    actualizarCarrito();
  }

  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
    itemsCarrito.innerHTML = '';
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} x ${item.cantidad} - Total: $${item.precio * item.cantidad}`;
      itemsCarrito.appendChild(li);
    });

    calcularTotal();
    actualizarBotonComprar();
  }

  // Función para calcular el total a pagar
  function calcularTotal() {
    let total = 0;
    carrito.forEach(item => {
      total += item.precio * item.cantidad;
    });
    totalPagar.textContent = total.toFixed(0);
  }

  // Función para vaciar el carrito
  function vaciarCarrito() {
    carrito = [];
    itemsCarrito.innerHTML = '';
    totalPagar.textContent = ''; // Reiniciar el total
    actualizarBotonComprar();
  }

  // Función para comprar
  function comprar() {
    const fechaCompra = new Date().toLocaleDateString();
    mostrarComprobante(fechaCompra);
    vaciarCarrito();
  }

  // Función para mostrar el comprobante de compra
  function mostrarComprobante(fechaCompra) {
    contenidoComprobante.innerHTML = '';
    let totalCompra = 0;

  carrito.forEach(item => {
    const productoDiv = document.createElement('div');
    productoDiv.textContent = `${item.nombre} x ${item.cantidad} - Total: $${item.precio * item.cantidad}`;
    productoDiv.style.marginBottom = '10px'; // Añadir espacio entre productos
    contenidoComprobante.appendChild(productoDiv);
    totalCompra += item.precio * item.cantidad; // Calcular el total de la compra
  });

  // Crear un elemento separador
  const separador = document.createElement('hr');
  separador.style.margin = '20px 0';
  contenidoComprobante.appendChild(separador);

  // Crear un elemento para mostrar el total de la compra
  const totalDiv = document.createElement('div');
  totalDiv.textContent = `Total de Compra: $${totalCompra.toFixed(0)}`;
  contenidoComprobante.appendChild(totalDiv);

  fechaCompraSpan.textContent = fechaCompra;

  const comprobante = document.getElementById('comprobante');
  comprobante.style.display = 'block';
  }

  // Función para cerrar el comprobante de compra
  function cerrarComprobante() {
    const comprobante = document.getElementById('comprobante');
    comprobante.style.display = 'none';
  }

  // Función para actualizar el estado del botón Comprar
  function actualizarBotonComprar() {
    botonComprar.disabled = carrito.length === 0;
  }

  // Evento para cargar categorías y productos al cargar el DOM
  cargarCategorias();
  cargarTodosLosProductos();

  // Eventos adicionales
  quitarFiltrosBtn.addEventListener('click', cargarTodosLosProductos);
  abrirCarritoBtn.addEventListener('click', function () {
    const carritoElem = document.getElementById('carrito');
    carritoElem.style.display = carritoElem.style.display === 'block' ? 'none' : 'block';
  });
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  cerrarComprobanteBtn.addEventListener('click', cerrarComprobante);

  // Delegación de eventos para añadir al carrito
  productList.addEventListener('click', function (event) {
    if (event.target.classList.contains('anadir-carrito-btn')) {
      manejarAñadirAlCarrito(event);
    }
  });

  botonComprar.addEventListener('click', comprar);
});
