// Seleccionar el botón del carrito, el contenedor del carrito y la lista del carrito
const botonCarrito = document.querySelector('.cart-btn');
const contenedorCarrito = document.querySelector('.cart-container');
const listaCarrito = document.querySelector('.cart-list');

// Inicializar la cuenta del carrito a 0
let cuentaCarrito = 0;

// Inicializar el array del carrito
let carrito = [];

// Verificar si hay un carrito guardado en localStorage
const carritoString = localStorage.getItem('carrito');
if (carritoString) {
  carrito = JSON.parse(carritoString);
  cuentaCarrito = carrito.length;
  botonCarrito.querySelector('.cart-count').textContent = cuentaCarrito;
  carrito.forEach((articulo) => {
    const elementoCarrito = document.createElement('li');
    elementoCarrito.innerHTML = `
      <img src="${articulo.imagen}" alt="${articulo.nombre}" width="30" height="30">
      <span>${articulo.nombre}</span>
      <span>${articulo.precio}</span>
      <button class="btn-remove">Eliminar</button>
    `;
    articulo.elementoCarrito = elementoCarrito;
    listaCarrito.appendChild(elementoCarrito);

    // Agregar evento de eliminación al botón "Eliminar"
    elementoCarrito.querySelector('.btn-remove').addEventListener('click', () => {
      // Eliminar el artículo del array del carrito
      const indice = carrito.findIndex((item) => item.nombre === articulo.nombre);
      if (indice !== -1) {
        carrito.splice(indice, 1);
      }

      // Guardar el carrito en localStorage
      const carritoString = JSON.stringify(carrito);
      localStorage.setItem('carrito', carritoString);

      // Eliminar el elemento del carrito de la lista del carrito
      articulo.elementoCarrito.remove();

      // Decrementar la cuenta del carrito
      cuentaCarrito--;

      // Actualizar la cuenta del carrito en la pantalla
      botonCarrito.querySelector('.cart-count').textContent = cuentaCarrito;
    });
  });
}

// Agregar evento al botón del carrito para togglear el contenedor del carrito
botonCarrito.addEventListener('click', () => {
  contenedorCarrito.classList.toggle('show');
});

// Agregar evento a los botones "Agregar al carrito"
document.querySelectorAll('.btn-details').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // Obtener el elemento del teléfono que se hizo clic
    const elementoTelefono = e.target.closest('.phone-item');

    // Obtener el nombre del teléfono, su precio y su imagen
    const nombreTelefono = elementoTelefono.querySelector('.phone-name').textContent;
    const precioTelefono = elementoTelefono.querySelector('.phone-price').textContent;
    const imagenTelefono = elementoTelefono.querySelector('img').src;

    // Crear un objeto para el artículo del carrito
    const articuloCarrito = {
      nombre: nombreTelefono,
      precio: precioTelefono,
      imagen: imagenTelefono,
      elementoCarrito: null
    };

    // Agregar el artículo al array del carrito
    carrito.push(articuloCarrito);

    // Guardar el carrito en localStorage
    const carritoString = JSON.stringify(carrito);
    localStorage.setItem('carrito', carritoString);

    // Crear el elemento del carrito
    const elementoCarrito = document.createElement('li');
    elementoCarrito.innerHTML = `
      <img src="${articuloCarrito.imagen}" alt="${articuloCarrito.nombre}" width="30" height="30">
      <span>${articuloCarrito.nombre}</span>
      <span>${articuloCarrito.precio}</span>
      <button class="btn-remove">Eliminar</button>
    `;
    articuloCarrito.elementoCarrito = elementoCarrito;
    listaCarrito.appendChild(elementoCarrito);

    // Agregar evento al botón "Eliminar"
    elementoCarrito.querySelector('.btn-remove').addEventListener('click', () => {
      // Eliminar el artículo del array del carrito
      const indice = carrito.findIndex((item) => item.nombre === articuloCarrito.nombre);
      if (indice !== -1) {
        carrito.splice(indice, 1);
      }

      // Guardar el carrito en localStorage
      const carritoString = JSON.stringify(carrito);
      localStorage.setItem('carrito', carritoString);

      // Eliminar el elemento del carrito de la lista del carrito
      articuloCarrito.elementoCarrito.remove();

      // Decrementar la cuenta del carrito
      cuentaCarrito--;

      // Actualizar la cuenta del carrito en la pantalla
      botonCarrito.querySelector('.cart-count').textContent = cuentaCarrito;
    });
  });
});