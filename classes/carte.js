export default class Carte {
  initCarte(id, restos) {
    let map = new google.maps.Map(document.getElementById(id), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 13
    });
    this.geoLocaliser(map);
    console.log(this.restaurants);
    restos.forEach(element => {
      this.addMarker({ lat: element.lat, lng: element.long }, map);
    });
  }

  geoLocaliser(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(pos);
          new google.maps.Marker({
            position: pos,
            map: map
          });
        },
        function() {
          alert("Merci d'activer votre géolocalisation");
        }
      );
    }
  }

  // Adds a marker to the map.
  addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    let iconBase = "https://cccms.csb.app/assets/img/";
    let marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: iconBase + "icon_resto_map_60x60.png"
    });
  }
}
