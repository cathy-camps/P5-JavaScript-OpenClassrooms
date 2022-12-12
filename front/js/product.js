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
      addToCart(cart);
      return kanap;
})
    .catch ((error) => {
     window.alert("Une erreur est survenue !");
})
};

fetchProduct();
let cartInStorage = [];

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
  const productChoice = {
        productColor: colorChoice,
        productQuantity: Number(quantityChoice),
        productId: paramId,
      }; 
      cartInStorage.push(productChoice);
    }
    updateCart();
    saveCart(cartInStorage);
    console.log(cartInStorage);
  });
}
addToCart();
//window.location.href = "./cart.html";

function saveCart(cartInStorage) {
localStorage.setItem("cartInStorage", JSON.stringify(cartInStorage));
//console.log(localStorage);
}
//récupérer les produits du LS
//let newArray = [];
function getFromLS () {
  let cart = localStorage.getItem("cartInStorage");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
//console.log(getFromLS());

const updateCart = () => {
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
console.log("Envoyé");




