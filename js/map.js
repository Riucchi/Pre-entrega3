function initMap() {
    var mapa = document.getElementById('mapa');
    var latLng = { lat: 40.4168, lng: -3.7038 };
    var opciones = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapaGoogle = new google.maps.Map(mapa, opciones);
  }
  
  window.onload = initMap;