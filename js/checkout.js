const carrito = JSON.parse(localStorage.getItem("carrito"));

const confirmacionList = document.querySelector(".confirmacion-list");

carrito.forEach((articulo) => {
  const confirmacionItem = document.createElement("li");
  confirmacionItem.innerHTML = `
    <img src="" alt="${articulo.nombre}" class="product-image">
    <div class="product-info">
      <p class="product-name">${articulo.nombre}</p>
      <p class="product-price">USD $${articulo.precio}</p>
    </div>
  `;
  if (!articulo.imagen) {
    fetch('https://raw.githubusercontent.com/Riucchi/Pre-entrega3/main/js/index.json')
      .then(response => response.json())
      .then(data => {
        const producto = data.find(producto => producto.id === articulo.id);
        if (producto) {
          confirmacionItem.querySelector('.product-image').src = producto.imagen;
        }
      });
  } else {
    confirmacionItem.querySelector('.product-image').src = articulo.imagen;
  }

  confirmacionList.appendChild(confirmacionItem);
});

const confirmacionTotalValue = document.querySelector("#confirmacion-total-value");
const total = carrito.reduce((acumulado, articulo) => acumulado + articulo.precio, 0);
confirmacionTotalValue.textContent = total;

const btnConfirmarCompra = document.querySelector(".btn-details");

btnConfirmarCompra.addEventListener("click", () => {

  localStorage.removeItem("carrito");


  Swal.fire({
    title: "Compra realizada con éxito!",
    text: "Gracias por tu compra. Tu pedido será procesado pronto.",
    icon: "success",
    confirmButtonText: "Aceptar"
  }).then(() => {
    window.location.href = "products.html";
  });
});