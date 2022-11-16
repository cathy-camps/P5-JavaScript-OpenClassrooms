
const urlValue = window.location.search;
const urlParams = new URLSearchParams(urlValue);
console.log(urlParams)
const paramId = urlParams.get("id");
console.log(paramId)

//récupérer le produit de l'API via son ID
  function fetchProduct() {
  fetch(`http://localhost:3000/api/products/${paramId}`)
    .then((res) => res.json())
   // console.log("success")
    .then((kanap) => {  
//console.log(kanap);
//récupération des éléments HTML
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
console.log(kanap, "success")
return kanap
    })
    .catch((error) => {
      window.alert("Une erreur est survenue !");
    }) 
  }
let kanap = fetchProduct();

 //sélecteur du bouton 'ajouter au panier' 
  document.getElementById("addToCart").addEventListener("click", (button) => {
    const quantity = document.querySelector('#quantity');
    const quantityChoice = quantity.value;
//initialisation d'une constante pour stocker les couleurs
    const color = document.querySelector('#colors');
    const colorChoice = color.value;
    console.log(colorChoice, quantityChoice);
//récupère le panier (cart = tableau)
//let cart = getCart(); 
    button.preventDefault();
    console.log("Envoyé");
 
  //gérer la quantité pour savoir si le produit est déjà dans le panier 
  function getCart (cart) {
    let foundKanap = cart.findIndex(p => p.id == paramId);
    if (cart[foundKanap] != undefined) {
      if (cart[foundKanap].quantity <= 100) {
        cart[foundKanap].quantity = cart[foundKanap].quantity + quantityChoice;
      }
    } else {
      product.quantity = 1;
      cart.push({ quantity: quantityChoice, color: colorChoice, id: paramId });
    }
    saveCart();
  }})

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(saveCart)
}


//window.location.href = "./cart.html";