
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
      //return kanap
})
    .catch ((error) => {
   window.alert("Une erreur est survenue !");
})
};
   let kanap = fetchProduct();

//sélecteur du bouton 'ajouter au panier' 
function addToCart(kanap) {
    document.getElementById("addToCart").addEventListener("click", (button) => {
    button.preventDefault();
    let cart = getProductsStorage();
//initialisation des constantes pour stocker les références du produit, et le choix de l'utilisateur
      const quantity = document.querySelector('#quantity');
      const quantityChoice = quantity.value;
      const color = document.querySelector('#colors');
      const colorChoice = color.value;
      //console.log(colorChoice, quantityChoice);
//message d'alerte si les quantité et les couleurs ne sont pas saisies
//if (colorChoice <= 0 || colorChoice == null) {
//alert ("Merci de choisir une quantité et une couleur");
      //console.log(cart)
      const productChoice = {
        color: colorChoice,
        quantity: quantityChoice,
        id: paramId,
      }
      let foundKanap = cart.find((cart => cart.id == paramId) && (cart => c.color == cart.color));
      if (foundKanap != null && foundKanap.quantity <= 100) {
        productChoice.forEach (parseInt(foundKanap.quantityChoice += cart.quantity++));
      } else { 
        cart.push(productChoice);
        console.log(productChoice)
      }
   newProduct();
   saveCart(cart);
  //window.location.href = "./cart.html";
    })};
//ajouter au panier
  addToCart(kanap);

//sauvegarder le panier dans localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart)
}

function newProduct (){
  let newId = localStorage.getItem("newId");
  let product=[];
  if(newId){
    product = JSON.parse(newId);
    console.log(newId)
  }
  //incrémenter l'id
  let id = product.length + 1;
  let color = document.querySelector('#colors').value;
  product.push({
    "id" :paramId,
    "color" :color,
  });
  localStorage.setItem("newId", JSON.stringify(product));
}
 
//ajouter les produits sélectionnés dans le panier   
//récupérer les produits du localStorage
function getProductsStorage(cart) {
  localStorage.getItem("cart")
  //tester si le panier est vide 
  if (cart== null) {
    alert: "Votre panier est vide !"
    return [];
  } else {
    return JSON.parse(cart) 
  }
};