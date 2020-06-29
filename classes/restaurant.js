import Carte from "./carte";

export default class Restaurant {
  constructor(restaurants) {
    this.id = null;
    this.nom = null;
    this.adresse = null;
    this.complementAdresse = null;
    this.codePostal = null;
    this.ville = null;
    this.numTel = null;
    this.horaireOuverture = null;
    this.latitude = null;
    this.longitude = null;
    this.photo = null;
    this.restaurants = restaurants;
  }
  getRestaurants() {
    return this.restaurants;
  }
  ajouterUnRestaurant() {
    const input = document.createElement("INPUT");
    input.setAttribute("class", "form-control");
    input.setAttribute("type", "text");
    input.setAttribute("id", "ets");
    input.setAttribute("name", "ets");
    const etablissement = document.getElementById("etablissement");
    etablissement.appendChild(input);
  }
  supprimerRestaurant() {}
  modifierRestaurant() {}

  afficherUnRestaurant(id, r) {
    const modalVoir = document.getElementById("modalVoir");
    modalVoir.appendChild(this.createModalVoir());

    if (id) {
      document.getElementById("modalNomEts").textContent = r.restaurantName;
      document.getElementById("modalAdress").textContent = r.address;

      r.ratings.forEach((element, index) => {
        const pAvis = document.createElement("p");
        pAvis.setAttribute("id", "avis" + index);
        this.createStars(
          element.stars,
          document.getElementById("modalAvis"),
          "img"
        );
        const hr = document.createElement("hr");

        document.getElementById("modalAvis").appendChild(pAvis);
        document.getElementById("avis" + index).textContent = element.comment;
        document.getElementById("modalAvis").appendChild(hr);
      });
    }
    this.fermerModal();
  }

  fermerModal() {
    document.getElementById("closeM").addEventListener("click", e => {
      document.getElementById("modalNomEts").textContent = "";
    });
  }
  creerAffichageFiltre(tab) {
    tab.forEach((resto, index) => {
      this.createRestoGroupCard(resto, index);

      document
        .getElementById("imgResto" + index)
        .setAttribute(
          "src",
          "https://maps.googleapis.com/maps/api/streetview?size=200x200&location=" +
            resto.restaurantName +
            "&key=AIzaSyCJoRuDkBmQ7SYW74aJUNdYQevNc14RZx4"
        );
    });
  }
  afficherListe(filtre, option) {
    const divCardGroup = document.createElement("div");
    divCardGroup.setAttribute("class", "card-columns");
    divCardGroup.setAttribute("id", "cardColumns");
    const listeResto = document.getElementById("listeResto");

    listeResto.append(divCardGroup);

    if (!filtre) {
      this.createFiltreForm();
    }

    if (option === 0) {
      this.creerAffichageFiltre(this.restaurants);
      new Carte().initCarte("carte", this.restaurants);
    } else if (option === 1) {
      let restaurantFiltrer = this.restaurants.filter(
        el => this.calculerMoyenne(el.ratings) <= 3
      );

      this.creerAffichageFiltre(restaurantFiltrer);
      new Carte().initCarte("carte", restaurantFiltrer);
    } else {
      let restaurantFiltrer = this.restaurants.filter(
        el => this.calculerMoyenne(el.ratings) > 3
      );

      this.creerAffichageFiltre(restaurantFiltrer);
      new Carte().initCarte("carte", restaurantFiltrer);
    }
  }
  calculerMoyenne(r) {
    let sum = 0;
    let moy;

    for (let j = 0; j < r.length; j++) {
      const el = r[j];
      sum = sum + el.stars;
      moy = Math.round(sum / r.length);
    }
    return moy;
  }
  createRestoGroupCard(resto, index) {
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    divCard.setAttribute("id", "dCard");

    this.createStars(this.calculerMoyenne(resto.ratings), divCard, "img");

    const divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");
    const hCardTitle = document.createElement("h6");
    hCardTitle.textContent = resto.restaurantName;
    hCardTitle.setAttribute("class", "card-title");

    const imgResto = document.createElement("img");
    imgResto.setAttribute("id", "imgResto" + index);

    const pCardText = document.createElement("p");
    pCardText.setAttribute("class", "card-text");

    const button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("id", "voirResto/" + index);
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modalVoirResto");

    button.innerHTML = '<i class="fa fa-eye" style="font-size:24px;"></i>';

    divCardBody.appendChild(hCardTitle);
    divCardBody.appendChild(imgResto);
    divCardBody.appendChild(pCardText);
    divCardBody.appendChild(button);

    divCard.appendChild(divCardBody);

    const cardColumns = document.getElementById("cardColumns");

    cardColumns.appendChild(divCard);

    document
      .getElementById("voirResto/" + index)
      .addEventListener("click", e => {
        this.afficherUnRestaurant(e.path[1]["id"].split("/")[1], resto);
      });
  }

  createStars(nbr, d, tag) {
    for (var i = 0; i < nbr; i++) {
      const img = document.createElement(tag);
      img.setAttribute("src", "./assets/img/etoile.png");
      img.setAttribute("class", "card-img-top etoile");
      //img.setAttribute("id", i);
      if (d === "dCard") {
        d.append(img);
      } else {
        d.appendChild(img);
      }
    }
  }
  createFiltreForm() {
    const form = document.createElement("form");
    const divFormGroup = document.createElement("div");
    divFormGroup.setAttribute("class", "form-group");
    const label = document.createElement("label");
    label.setAttribute("for", "filtreSelect");
    const select = document.createElement("select");
    select.setAttribute("class", "form-control");
    select.setAttribute("id", "filtreSelect");
    const option0 = document.createElement("option");
    option0.textContent = "";
    const option1 = document.createElement("option");
    option1.textContent = "entre 1 étoile et 3 étoiles";
    const option2 = document.createElement("option");
    option2.textContent = "4 étoiles et plus";

    select.appendChild(option0);
    select.appendChild(option1);
    select.appendChild(option2);

    divFormGroup.appendChild(label);
    divFormGroup.appendChild(select);
    form.appendChild(divFormGroup);

    const filtreSelect = document.getElementById("filtreSelect");
    filtreSelect.appendChild(form);
  }
  createModalVoir() {
    const divModal = document.createElement("div");
    divModal.setAttribute("class", "modal fade");
    divModal.setAttribute("data-backdrop", "static");
    divModal.setAttribute("data-keyboard", "false");
    divModal.setAttribute("aria-labelledby", "modalNomEts");
    divModal.setAttribute("id", "modalVoirResto");
    divModal.setAttribute("tabindex", "-1");
    divModal.setAttribute("role", "dialog");

    const divModalDialog = document.createElement("div");
    divModalDialog.setAttribute(
      "class",
      "modal-dialog modal-dialog-scrollable"
    );

    const divModalContent = document.createElement("div");
    divModalContent.setAttribute("class", "modal-content");

    const divModalHeader = document.createElement("div");
    divModalHeader.setAttribute("class", "modal-header");

    const h5 = document.createElement("h5");
    h5.setAttribute("id", "modalNomEts");
    h5.setAttribute("class", "modal-title");

    const pModalAdress = document.createElement("p");
    pModalAdress.setAttribute("id", "modalAdress");

    const pModalTel = document.createElement("p");
    pModalTel.setAttribute("id", "modalTel");

    const bCloseModal = document.createElement("a");
    bCloseModal.setAttribute("href", "#");

    bCloseModal.setAttribute("type", "button");
    bCloseModal.setAttribute("class", "close");
    bCloseModal.setAttribute("id", "closeM");
    bCloseModal.setAttribute("data-dismiss", "modal");
    bCloseModal.setAttribute("aria-label", "Close");

    const spanClose = document.createElement("span");
    spanClose.setAttribute("aria-hidden", "true");
    spanClose.innerHTML = "&times;";

    const divModalBody = document.createElement("div");
    divModalBody.setAttribute("class", "modal-body");
    divModalBody.setAttribute("id", "modalBody");

    const divModalAvis = document.createElement("div");
    divModalAvis.setAttribute("id", "modalAvis");

    const divModalFooter = document.createElement("div");
    divModalFooter.setAttribute("class", "modal-footer");

    const bModalAvis = document.createElement("button");
    bModalAvis.setAttribute("type", "button");
    bModalAvis.setAttribute("class", "btn btn-primary");
    bModalAvis.textContent = "Donner un avis";

    divModalHeader.appendChild(h5);

    bCloseModal.appendChild(spanClose);
    divModalHeader.appendChild(bCloseModal);

    divModalContent.appendChild(divModalHeader);

    divModalBody.appendChild(pModalAdress);
    divModalBody.appendChild(pModalTel);
    divModalBody.appendChild(divModalAvis);

    divModalContent.appendChild(divModalBody);

    divModalFooter.appendChild(bModalAvis);
    divModalContent.appendChild(divModalFooter);

    divModalDialog.appendChild(divModalContent);
    divModal.appendChild(divModalDialog);

    return divModal;
  }
}
