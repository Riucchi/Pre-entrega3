
function crearArticulo(articulo) {
  const phoneItem = document.createElement("div");
  phoneItem.classList.add("phone-item");

  const phoneImage = crearImagenArticulo(articulo);
  const phoneName = crearNombreArticulo(articulo);
  const phonePrice = crearPrecioArticulo(articulo);
  const detailsContainer = crearContenedorDetalles(articulo);

  phoneItem.appendChild(phoneImage);
  phoneItem.appendChild(phoneName);
  phoneItem.appendChild(phonePrice);
  phoneItem.appendChild(detailsContainer);

  return phoneItem;
};

function crearImagenArticulo(articulo) {
  const phoneImage = document.createElement("img");
  phoneImage.src = articulo.imagen;
  phoneImage.alt = articulo.nombre;
  phoneImage.classList.add("phone-image");

  phoneImage.addEventListener('mouseover', () => {
    phoneImage.parentNode.classList.add('phone-hover');
  });

  phoneImage.addEventListener('mouseout', () => {
    phoneImage.parentNode.classList.remove('phone-hover');
  });

  return phoneImage;
};


function crearNombreArticulo(articulo) {
  const phoneName = document.createElement("h2");
  phoneName.textContent = articulo.nombre;
  phoneName.classList.add("phone-name");

  return phoneName;
};


function crearPrecioArticulo(articulo) {
  const phonePrice = document.createElement("p");
  phonePrice.textContent = `Precio: USD $${articulo.precio}`;
  phonePrice.classList.add("phone-price");

  return phonePrice;
};


function crearContenedorDetalles(articulo) {
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");

  const btnDetails = crearBotonAgregarAlCarrito(articulo);
  const btnVerDetalles = crearBotonVerDetalles(articulo);

  detailsContainer.appendChild(btnDetails);
  detailsContainer.appendChild(btnVerDetalles);

  return detailsContainer;
};

function crearBotonAgregarAlCarrito(articulo) {
  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Agregar al carro";
  btnDetails.classList.add("btn-details");
  btnDetails.addEventListener("click", () => {
    agregarAlCarrito(articulo);
  });

  return btnDetails;
};


function crearBotonVerDetalles(articulo) {
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

  return btnVerDetalles;
}

function crearArticulos() {
  fetch('https://raw.githubusercontent.com/Riucchi/Pre-entrega3/main/js/index.jsonn')
    .then(response => response.json())
    .then(articulos => {
      const phoneGrid = document.querySelector(".phone-grid");
      phoneGrid.innerHTML = "";

      articulos.forEach((articulo) => {
        const phoneItem = crearArticulo(articulo);
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



