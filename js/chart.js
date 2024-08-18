
const articulos = [
  {
    id: 1,
    nombre: "Samsung Galaxy S22 128GB",
    precio: 500,
    imagen: "img/phone1.jpg"
  },
  {
    id: 2,
    nombre: "Motorola G22 64GB",
    precio: 200,
    imagen: "img/phone2.jpg"
  },
  {
    id: 3,
    nombre: "Motorola G32 128GB",
    precio: 300,
    imagen: "https://images.fravega.com/f500/cdc761d6c867405f901e68aa89f4f4cc.jpg"
  },
  {
    id: 4,
    nombre: "Samsung Galaxy A54 256GB",
    precio: 400,
    imagen: "https://img.global.news.samsung.com/latin/wp-content/uploads/2023/03/dl9_Galaxy-A34-5G_Awesome-Violet_Front-e1680727963881.jpg"
  },
  {
    id: 5,
    nombre: "Samsung Galaxy S24 Ultra 512GB",
    precio: 700,
    imagen: "https://www.cordobadigital.net/wp-content/uploads/2024/01/S24-Ultra-Grey.jpg"
  },
  {
    id: 6,
    nombre: "Samsung Galaxy A15 32GB",
    precio: 150,
    imagen: "https://images.fravega.com/f500/fab008becfc6915dae142d5e48a6fc34.jpg"
  }
];


function crearArticulos() {
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
    btnDetails.textContent = "Add to Cart";
    btnDetails.classList.add("btn-details");

    detailsContainer.appendChild(btnDetails);
    phoneItem.appendChild(phoneImage);
    phoneItem.appendChild(phoneName);
    phoneItem.appendChild(phonePrice);
    phoneItem.appendChild(detailsContainer);

    phoneGrid.appendChild(phoneItem);
  });
};



crearArticulos();

let carrito = [];


function agregarAlCarrito(articulo) {
  carrito.push(articulo);
  actualizarCarrito();
  guardarCarritoEnLocalStorage();
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


articulos.forEach((articulo) => {
  const btnDetails = document.querySelector(`.phone-item:nth-child(${articulos.indexOf(articulo) + 1}) .btn-details`);
  btnDetails.addEventListener("click", () => {
    agregarAlCarrito(articulo);
  });
});


function eliminarDelCarrito(articulo) {
  const indice = carrito.indexOf(articulo);
  if (indice !== -1) {
    carrito.splice(indice, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }
};
