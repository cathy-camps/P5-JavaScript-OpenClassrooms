const urlValue = window.location.search;
const urlParams = new URLSearchParams(urlValue);
//console.log(urlParams)
const paramId = urlParams.get("id");
console.log(paramId)

//récupérer le produit de l'API via son ID
  function fetchProduct() {
  fetch(`http://localhost:3000/api/products/${paramId}`)
    .then((res) => res.json())
    .then((kanap) => {  
//affichage des éléments HTML
      let imgKanap = document.querySelector(".item__img");
      let title = document.getElementById('title');
      let descriptionKanap = document.getElementById('description');
      let priceKanap = document.getElementById('price');
//insertion du texte descriptif des éléments     
      imgKanap.innerHTML = `<img src= "${kanap.imageUrl}" alt="${kanap.altTxt}">`
      title.textContent = `${kanap.name}`;
      priceKanap.textContent = `${kanap.price}`;
      descriptionKanap.textContent = `${kanap.description}`;      
//récupérer le sélecteur pour le choix des couleurs
      let select = document.querySelector("select");
//création d'une boucle pour sélectionner la couleur du produit
      for (let color of kanap.colors) {
      let choice = document.createElement('option');
      choice.textContent = color;
      choice.value = color;
      select.appendChild(choice);
      }
      //console.log("success")
      return kanap;
})
    .catch ((error) => {
     window.alert("Une erreur est survenue !");
})
};

fetchProduct();
let cartInStorage = [];
let productChoice = [];
const productId = `${paramId}`;

//sélecteur du bouton 'ajouter au panier' + ajouter les produits sélectionnés dans le panier  
    function addToCart() {
    document.getElementById("addToCart").addEventListener("click", (button) => {
    button.preventDefault(); 
//initialisation des constantes pour stocker les références du produit, et le choix de l'utilisateur
    const quantityChoice = document.querySelector('#quantity').value;
    const colorChoice = document.querySelector('#colors').value;
    
//message d'alerte si les quantité et les couleurs ne sont pas saisies
  if (colorChoice <= 0 || colorChoice == null) {
  alert ("Merci de choisir une couleur");
  } 
  else if (quantityChoice < 1 || quantityChoice > 100) {
  alert ("Merci de choisir une quantité entre 1 et 100");
  }
  else if ((quantityChoice > 0 && quantityChoice <= 100) && (quantityChoice != 0 && colorChoice != "")); 
  {
//on récupère le produit à ajouter dans le panier 
  productChoice = {
        productColor: colorChoice,
        productQuantity: Number(quantityChoice),
        productId: paramId,
      }; 
  //object : console.log(productChoice) 
      cartInStorage.push(productChoice);
    }
    saveCart(cartInStorage);
  //array : console.log(cartInStorage);
  });
}
addToCart();
//window.location.href = "./cart.html";
 
function saveCart(cartInStorage) {
let cart = JSON.parse(localStorage.getItem("cartInStorage"));
if(cart == null) {
  localStorage.setItem("cartInStorage", JSON.stringify(cartInStorage))
}else{
  cart.forEach((item) => {
    console.log(item) //objet
    if (
      item.productId == productChoice.productId && item.productColor == productChoice.productColor
    ) {
      item.productQuantity = item.productQuantity + productChoice.productQuantity;
      item.productQuantity++;
    } else {
      cartInStorage.push(item);
      localStorage.setItem("cartInStorage", JSON.stringify(cartInStorage));
    }
  });
}};

/*
//création d'un objet JSON, le convertir en string and stores the string as "cartInStorage"
function saveCart(cartInStorage) { 
let cart = JSON.stringify(cartInStorage);
localStorage.setItem("cartInStorage", JSON.stringify(cartInStorage));

//récupères le string et la convertit en objet JS
let retrieveString = localStorage.getItem("cartInStorage");
const parseObject = JSON.parse(retrieveString);

//modifier l'objet, le convertir en string et remettre le cart existant dans le LS
parseObject.name = newName;
const stringifyForStorage = JSON.stringify(parseObject);
localStorage.setItem("cartInStorage", stringifyForStorage);*/

//récupérer les produits du LS
//let newArray = [];
/*function getFromLS () {
  let cart = localStorage.getItem("cartInStorage");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
//console.log(getFromLS());

const updateCart = (foundKanap) => {
  let cart = getFromLS();
  let foundKanap = cart;
  cart.forEach(() => {
  foundKanap = cart.find(p => p.productId == paramId && p.productColor == colorChoice);
  console.log(paramId)
  });
  { if (cart[foundKanap] != null) {
    cart[foundKanap].quantityChoice;
    if (cart[foundKanap].quantity <= 100) {
        cart[foundKanap].quantity = cart[foundKanap].quantity + quantityChoice;
    }
} else {
    cart.push({ quantity: quantityChoice, color: colorChoice, id: paramId });
}
}};
saveCart(cartInStorage);
console.log("Envoyé");*/

