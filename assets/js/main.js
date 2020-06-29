import Carte from "../../classes/carte.js";
import Restaurant from "../../classes/restaurant.js";

fetch("https://12bjt.csb.app/dataBase/dataBase.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    let restaurants = new Restaurant(json);
    console.log(restaurants);
    new Carte().initCarte("carte", restaurants.getRestaurants());
    //console.log(restaurants.afficherRestaurants());
    restaurants.afficherListe(false, 0);
    document.getElementById("filtreSelect").addEventListener("change", e => {
      if (e.target.selectedIndex === null || e.target.selectedIndex === 0) {
        document.getElementById("cardColumns").remove();
        restaurants.afficherListe(true, 0);
      } else {
        document.getElementById("cardColumns").remove();
        restaurants.afficherListe(true, e.target.selectedIndex);
        console.log("e", e.target.selectedIndex);
      }
    });
  })
  .catch(function(err) {
    console.log("Problème avec fetch :" + err.message);
  });
