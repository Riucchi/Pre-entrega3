const searchToggle = document.querySelector('.search-toggle');
const searchInput = document.querySelector('#search-input');
const agents = document.querySelectorAll('.agent');
const phones = document.querySelectorAll('.phone-item');
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');


searchToggle.addEventListener('click', () => {
  searchInput.parentNode.classList.toggle('active');
});





agents.forEach(agent => {
  const img = agent.querySelector('img');
  img.addEventListener('mouseover', () => {
    agent.classList.toggle('agent-hover');
  });

  img.addEventListener('mouseout', () => {
    agent.classList.toggle('agent-hover');
  });
});
phones.forEach(phone => {
  const img = phone.querySelector('.phone-image');
  img.addEventListener('mouseover', () => {
    phone.classList.toggle('phone-hover');
  });

  img.addEventListener('mouseout', () => {
    phone.classList.toggle('phone-hover');
  });
});
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

