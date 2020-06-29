export default class Utilisateur {
  constructor(
    id,
    civilite,
    nom,
    prenom,
    dateDeNaissance,
    courriel,
    telephone,
    mdp
  ) {
    this.id = id;
    this.civilite = civilite;
    this.nom = nom;
    this.prenom = prenom;
    this.dateDeNaissance = dateDeNaissance;
    this.courriel = courriel;
    this.telephone = telephone;
    this.mdp = mdp;
  }
  seConnecter() {}
  seDeconnecter() {}
  inscription() {}
}
