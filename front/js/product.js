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
      imgKanap.inserAdjacentHTML = `<img src= "${kanap.imageUrl}" alt="${kanap.altTxt}">`
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
console.log(kanap, "success")
return kanap
    })
    .catch((error) => {
      window.alert("Une erreur est survenue !");
    }) 
}
    
let kanap = fetchProduct();

window.onload=function () {
  document.getElementById("addToCart").addEventListener("click", (button) => {
    //récupération des données saisies //ajout du produit dans le panier
      //initialisation d'une constante pour la quantité
      const quantity = document.querySelector('#quantity');
      //noter le choix de l'utilisateur dans une variable
      const quantityChoice = quantity.value;
      //sélecteur du bouton 'ajouter au panier' + envoyer le panier
      //initialisation d'une constante pour stocker les couleurs
      const color = document.querySelector('#colors');
      const colorChoice = color.value;
      console.log(colorChoice, quantityChoice);
      button.preventDefault();
      console.log("Envoyé")
  
      //récupère le panier (cart = tableau)
    function getCart(cart) {
  //gérer la quantité pour savoir si le produit est déjà dans le panier
    let foundKanap = cart.findIndex(p => p.id == paramId);
    if (cart[foundKanap] != undefined) {
      if (cart[foundKanap].quantity <= 100) {
        cart[foundKanap].quantity = cart[foundKanap].quantity + quantityChoice;
      }
    } else {
      cart.push({ quantity: quantityChoice, color: colorChoice, id: paramId })
    }
    saveCart(cart);
  }
})
}

//enregistrer le panier dans localstorage 
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}