
import {getBasket} from "./cart.js"

const urlValue = window.location.search;
const urlParams = new URLSearchParams(urlValue);
const paramId = urlParams.get('id');
console.log(paramId)

//récupérer le produit de l'API via son ID
function fetchProduct() {
  fetch(`http://localhost:3000/api/products/${paramId}`)
    .then((res) => res.json())
    .then((kanap) => {
      
//récupération des éléments HTML
      let imgKanap = document.querySelector(".item__img");
      let title = document.getElementById('title');
      let descriptionKanap = document.getElementById('description');
      let priceKanap = document.getElementById('price');
//insertion du texte descriptif des éléments     
      imgKanap.innerHTML = `<img src= "${kanap.imageUrl}" alt="${kanap.altTxt}">`
      title.textContent = `${kanap.name}`;
      priceKanap.innerHTML = `${kanap.price}`;
      descriptionKanap.innerHTML = `${kanap.description}`;
      
//initialisation d'une constante pour stocker les couleurs
const colors = kanap.colors
//récupérer le sélecteur pour le choix des couleurs
let select = document.querySelector("select");
//création d'une boucle pour sélectionner la couleur du produit
for (let color of kanap.colors) {
  let choice = document.createElement('option');
  choice.textContent = color;
  choice.value = color;
  select.appendChild(choice);
}

//récupération des données saisies //ajout du produit dans le panier
console.log(kanap, "success")
return kanap
    })
    .catch((error) => {
      window.alert("Une erreur est survenue !");
    })
  
}
    
let kanap = fetchProduct();

function addToCart(kanap) {
  //initialisation d'une constante pour la quantité
  const quantity = document.querySelector('#quantity');
  //noter le choix de l'utilisateur dans une variable
  const quantityChoice = quantity.value;
  //sélecteur du bouton 'ajouter au panier' + envoyer le panier
  document.getElementById("addToCart").addEventListener("click", (button) => {
  //event.preventDefault();
    console.log("Envoyé")
    //récupère le panier (cart = tableau)
    let cart = getBasket()
    
    //gérer la quantité pour savoir si le produit est déjà dans le panier

    let foundKanap = cart.findIndex(p => p.id == paramId);
    if (cart[foundKanap] != undefined) {
      if (cart[foundKanap].quantity <= 100) {
        cart[foundKanap].quantity = cart[foundKanap].quantity + quantityChoice;
      }
    } else {
      cart.push({ quantity: quantityChoice, color: "red", id: paramId })
    }
    saveCart(cart);
  })
}
addToCart(kanap);
//enregistrer le panier dans localstorage 
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.open((`http://localhost:3000/api/products/`), "product.js", "cart.js");
