function crearArticulos() {
  fetch('../index.json')
    .then(response => response.json())
    .then(articulos => {
      const phoneGrid = document.querySelector(".phone-grid");
      phoneGrid.innerHTML = "";

      articulos.forEach((articulo) => {
        const phoneItem = document.createElement("div");
        phoneItem.classList.add("phone-item");

        const phoneImage = document.createElement("img");
        phoneImage.src = articulo.imagen;
        phoneImage.alt = articulo.nombre;
        phoneImage.classList.add("phone-image");

        phoneImage.addEventListener('mouseover', () => {
          phoneItem.classList.add('phone-hover');
        });

        phoneImage.addEventListener('mouseout', () => {
          phoneItem.classList.remove('phone-hover');
        });

        const phoneName = document.createElement("h2");
        phoneName.textContent = articulo.nombre;
        phoneName.classList.add("phone-name");

        const phonePrice = document.createElement("p");
        phonePrice.textContent = `Precio: USD $${articulo.precio}`;
        phonePrice.classList.add("phone-price");

        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("details-container");

        const btnDetails = document.createElement("button");
        btnDetails.textContent = "Agregar al carro";
        btnDetails.classList.add("btn-details");
        btnDetails.addEventListener("click", () => {
          agregarAlCarrito(articulo);
        });

        const btnVerDetalles = document.createElement("a");
        btnVerDetalles.href = `product-details.html?id=${articulo.id}`;

        const buttonVerDetalles = document.createElement("button");
        buttonVerDetalles.type = "button";
        buttonVerDetalles.textContent = "Ver detalles";
        buttonVerDetalles.classList.add("btn-detail");

        buttonVerDetalles.addEventListener("click", () => {
          window.location.href = `product-details.html?id=${articulo.id}`;
        });

        btnVerDetalles.appendChild(buttonVerDetalles);

        detailsContainer.appendChild(btnDetails);
        detailsContainer.appendChild(btnVerDetalles);
        phoneItem.appendChild(phoneImage);
        phoneItem.appendChild(phoneName);
        phoneItem.appendChild(phonePrice);
        phoneItem.appendChild(detailsContainer);

        phoneGrid.appendChild(phoneItem);
      });
    });
}



crearArticulos();

let carrito = [];


function agregarAlCarrito(articulo) {
  carrito.push(articulo);
  actualizarCarrito();
  guardarCarritoEnLocalStorage();
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Artículo agregado',
    text: `Has agregado ${articulo.nombre} al carrito`,
    showConfirmButton: false,
    timer: 1500
  });
}


function actualizarCarrito() {
  const cartList = document.querySelector(".cart-list");
  cartList.innerHTML = "";

  carrito.forEach((articulo) => {
    const cartItem = document.createElement("li");
    cartItem.className = "cart-item";
  
    const img = document.createElement("img");
    img.src = articulo.imagen;
    img.alt = articulo.nombre;
    cartItem.appendChild(img);
  
    const nombre = document.createElement("span");
    nombre.textContent = articulo.nombre;
    cartItem.appendChild(nombre);
  
    const precio = document.createElement("span");
    precio.textContent = `USD $${articulo.precio}`;
    cartItem.appendChild(precio);
  
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.className = "btn-remove";
    eliminarBtn.addEventListener("click", () => {
      eliminarDelCarrito(articulo);
    });
    cartItem.appendChild(eliminarBtn);
  
    cartList.appendChild(cartItem);
  });

  const cartTotal = document.querySelector(".cart-total");
  const total = carrito.reduce((acumulado, articulo) => acumulado + articulo.precio, 0);
  cartTotal.textContent = `Total: USD $${total}`;

  const cartCount = document.querySelector(".cart-count");
  cartCount.textContent = carrito.length;
}


function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


function cargarCarritoDesdeLocalStorage() {
  const carritoStorage = localStorage.getItem("carrito");
  if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
    actualizarCarrito();
  }
}


cargarCarritoDesdeLocalStorage();


const cartBtn = document.querySelector('.cart-btn');
const cartContainer = document.querySelector('.cart-container');

cartBtn.addEventListener('click', () => {
  cartContainer.classList.toggle('show');
});




function eliminarDelCarrito(articulo) {
  const indice = carrito.indexOf(articulo);
  if (indice !== -1) {
    carrito.splice(indice, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Artículo removido',
      text: `Has removido ${articulo.nombre} del carrito`,
      showConfirmButton: false,
      timer: 1500
    });
  }
}



