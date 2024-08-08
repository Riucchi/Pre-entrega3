const agents = document.querySelectorAll('.agent');
const phones = document.querySelectorAll('.phone-item');
const sidebar = document.querySelector('.sidebar');

function initMap() {
  var mapa = document.getElementById('mapa');
  var latLng = { lat: 40.4168, lng: -3.7038 }; // Centro del mapa en Madrid, España
  var opciones = {
    center: latLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapaGoogle = new google.maps.Map(mapa, opciones);
}

window.onload = initMap;


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

