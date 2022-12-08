
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

let cart = fetchProduct();

//sélecteur du bouton 'ajouter au panier' + ajouter les produits sélectionnés dans le panier  
    function addToCart(cart) {
    document.getElementById("addToCart").addEventListener("click", (button) => {
    button.preventDefault(); 
//initialisation des constantes pour stocker les références du produit, et le choix de l'utilisateur
    const quantityChoice = document.querySelector('#quantity').value;
    const colorChoice = document.querySelector('#colors').value;
    console.log(colorChoice, quantityChoice);
    
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
      //addNewProductToCart();
      console.log(productChoice);

      let cartInStorage = [];
      cartInStorage.push(productChoice);
      console.log(cartInStorage);

//gérer les données du LS
//sauvegarder les données du LS
const saveCart = {
      set : function(cart, cartInStorage) {
            if (!cart || !cartInStorage) {return;}
            if(typeof cart === "object"){
                 cartInStorage = JSON.stringify(cartInStorage);
            }
            localStorage.setItem(cart, cartInStorage);
      }};  

//récupérer les données du LS      
const getCart = {
      get : function(cart) {
            let cartInStorage = localStorage.getItem(cart);
            if(!cartInStorage) {return;}
            if(cartInStorage[0] === "{"){
            value = JSON.parse(cartInStorage);
            }
            return getCart;
            }};    
     
//vérifier si le panier contient un nouveau produit avant de le stocker dans le LS
const addNewProductToCart = () => {
      let cartInStorage = getCart;
if (cartInStorage) {
//recherche de l'id et de la couleur du produit  
  let foundKanap = cartInStorage(cart).find(((p) => p.productId == paramId) && ((p) => productColor.color == colorChoice));
  console.log(paramId);
//on ajoute le nouveau produit sélectionné dans le LS
  if (foundKanap) {
  let newCart = productChoice.forEach(parseInt(foundKanap.quantityChoice += foundKanap.colorChoice), newCart++);
  foundKanap.quantityChoice = newCart;
  saveCart;
  addNewProductToCart();
  alert("votre produit a été ajouté au panier");
      cartInStorage.push(newCart);
      } 
// si le panier est vide    
     else { 
       cartInStorage = [];  
      }}
       }
}})};
      addToCart(cart);
      console.log(cart)
      

//window.location.href = "./cart.html";

