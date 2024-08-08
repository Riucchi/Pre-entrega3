const searchToggle = document.querySelector('.search-toggle');
const searchInput = document.querySelector('#search-input');

searchToggle.addEventListener('click', () => {
  searchInput.parentNode.classList.toggle('active');
});

const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;


carouselItems.forEach((item) => {
  item.style.width = `${carousel.offsetWidth}px`;
  console.log(`Set width of item ${item} to ${carousel.offsetWidth}px`);
});


carousel.style.transform = `translateX(0px)`;
console.log(`Initial transform: translateX(0px)`);

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
  console.log(`Previous button clicked, current index: ${currentIndex}`);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
  console.log(`Next button clicked, current index: ${currentIndex}`);
});

function updateCarousel() {
  carousel.style.transform = `translateX(${currentIndex * -carousel.offsetWidth}px)`;
  console.log(`Updated transform: translateX(${currentIndex * -carousel.offsetWidth}px)`);
}

// automatically change image every 5 seconds
setInterval(() => {
  nextBtn.click(); // simulate a click on the next button
  console.log(`Interval triggered, current index: ${currentIndex}`);
}, 5000);

// Update carousel item widths on window resize
window.addEventListener('resize', () => {
  carouselItems.forEach((item) => {
    item.style.width = `${carousel.offsetWidth}px`;
  });
});