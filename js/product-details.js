const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id')); 

function getProductoById(id) {
  return fetch('../index.json')
    .then(response => response.json())
    .then(articulos => {
      const producto = articulos.find(articulo => articulo.id === id);
      return producto; 
    });
}

getProductoById(productId).then(producto => {
  if (producto) {
    const productName = document.getElementById('product-name');
    const productImage = document.getElementById('product-image');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price-value');

    productName.textContent = producto.nombre;
    productImage.src = producto.imagen;
    productDescription.textContent = producto.descripcion;
    productPrice.textContent = producto.precio;


    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Agregar al carrito';
    addToCartBtn.className = 'btn-details';

    const productInfo = document.querySelector('.product-info');
    productInfo.appendChild(addToCartBtn);


    addToCartBtn.addEventListener('click', () => {
      agregarAlCarrito(producto);
    });
  }
});