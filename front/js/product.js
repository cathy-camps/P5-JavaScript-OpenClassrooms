//Récupérer la valeur d'un paramètre spécifique dans la chaine de requête d'une URL
//Stocke la chaîne de requête de l'URL actuelle dans la variable 'urlValue'
const urlValue = window.location.search;
//Crée un nouvel objet 'URLSearchParams' en utilisant 'urlValue' comme paramètre, pour un accès à ceux de la chaîne de requête.
const urlParams = new URLSearchParams(urlValue);
//Récupérer la valeur du paramètre 'id' de la chaine de requête et la stocke dans une variable
const paramId = urlParams.get("id");
console.log(paramId);

//récupérer le produit de l'API via son ID et affiche ses infos sur la page HTML
function fetchProduct() {
  fetch(`http://localhost:3000/api/products/${paramId}`)
    .then((res) => res.json())
    .then((kanap) => {
      //Sélection des éléments HTML pour les afficher
      let imgKanap = document.querySelector(".item__img");
      let title = document.getElementById("title");
      let descriptionKanap = document.getElementById("description");
      let priceKanap = document.getElementById("price");
      //insertion du texte descriptif des éléments
      imgKanap.innerHTML = `<img src= "${kanap.imageUrl}" alt="${kanap.altTxt}">`;
      title.textContent = `${kanap.name}`;
      priceKanap.textContent = `${kanap.price}`;
      descriptionKanap.textContent = `${kanap.description}`;
      //récupérer le sélecteur pour le choix des couleurs
      let select = document.querySelector("select");
      //création d'une boucle pour afficher les options de couleur du produit, la boucle parcourt le tableau 'kanap.colors'
      for (let color of kanap.colors) {
        let choice = document.createElement("option");
        choice.textContent = color;
        choice.value = color;
        select.appendChild(choice);
      }
      return kanap;
    })
    .catch((error) => {
      window.alert("Une erreur est survenue !");
    });
}

fetchProduct();

//sélecteur du bouton 'ajouter au panier' + ajouter les produits sélectionnés dans le panier
//ajout d'un écouteur d'évènement pour un évènement clic
const addToCart = () => {
  document.getElementById("addToCart").addEventListener("click", (button) => {
    button.preventDefault();
    //initialisation des constantes pour stocker la quantité et la couleur sélectionnés par l'utilisateur
    const quantityChoice = document.querySelector("#quantity").value;
    const colorChoice = document.querySelector("#colors").value;
    //message d'alerte si les quantité et les couleurs ne sont pas saisies. On vérifie si l'utilisateur a bien fait sa sélection et sinon affiche un message d'alerte
    if (colorChoice <= 0 || colorChoice == null) {
      alert("Merci de choisir une couleur");
    } else if (quantityChoice < 1 || quantityChoice > 100) {
      alert("Merci de choisir une quantité entre 1 et 100");
    } else if (
      quantityChoice > 0 &&
      quantityChoice <= 100 &&
      colorChoice != ""
    ) {
      //on récupère le produit à ajouter dans le panier
      productChoice = {
        productColor: colorChoice,
        productQuantity: Number(quantityChoice),
        productId: paramId,
      };
      saveCart(productChoice);
    }
  });
};
addToCart();

//let cartInStorage = addToCart();
//console.log(cartInStorage);

//mise en place du localStorage
const saveCart = (productChoice) => {
  //écupère les articles du panier du stockage local et crée un tableau vide
  let cart = JSON.parse(localStorage.getItem("cartInStorage"));
  let cartToSave = [];
  let productFound = false; let saveCart = true;
  //vérifier si le panier est vide en parcourant les articles du panier et en vérifiant si l'article courant a le même id et la même couleur. Si oui, met à jour la quantité et ajoute l'article au tableau
  if (cart != null) {
    cart.forEach((item) => {
      if (
        item.productId == productChoice.productId &&
        item.productColor == productChoice.productColor
      ) {
        item.productQuantity = item.productQuantity + productChoice.productQuantity;
        if (item.productQuantity > 100) {
          alert("la quantite doit etre inférieure à 100 !");
          saveCart = false;
        } else {
          cartToSave.push(item);
          productFound = true;
        }
      } else {
        //mise à jour du panier et du localStorage
        cartToSave.push(item);
      }
    });
  }

  if (!productFound) {
    cartToSave.push(productChoice);
  }

  if (saveCart) {
    //affiche un message d'alerte et redirige vers la page panier
    localStorage.setItem("cartInStorage", JSON.stringify(cartToSave));
    if (confirm("Votre produit a été ajouté au panier. Voulez-vous ajouter autre article ?")) {
      window.location.href = "index.html";
    } else {
      window.location.href = "cart.html";
    }
  }
};
