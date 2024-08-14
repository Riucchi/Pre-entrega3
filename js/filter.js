document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filter-form');
    const phoneGrid = document.querySelector('.phone-grid');
  
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const filterValue = document.querySelector('input[name="filter"]:checked').id;
      filtrarProductos(filterValue, phoneGrid);
    });
  });
  
  function filtrarProductos(filterValue, phoneGrid) {
    const phones = Array.from(phoneGrid.children);
    const phoneData = phones.map((phone) => {
      const price = phone.querySelector('.phone-price') ? parseFloat(phone.querySelector('.phone-price').textContent.replace(/[^\d\.]+/g, '')) : 0;
      return { phone, price };
    });
  
    switch (filterValue) {
      case 'all-products':
        phones.forEach((phone) => {
          phone.style.display = 'block';
        });
        break;
      case 'price-asc':
        phoneData.sort((a, b) => b.price - a.price);
        phoneData.forEach((phoneData) => {
          phoneGrid.appendChild(phoneData.phone);
          phoneData.phone.style.display = 'block';
        });
        break;
      case 'price-desc':
        phoneData.sort((a, b) => a.price - b.price);
        phoneData.forEach((phoneData) => {
          phoneGrid.appendChild(phoneData.phone);
          phoneData.phone.style.display = 'block';
        });
        break;
      default:
        break;
    }
  }