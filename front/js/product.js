
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
 function addToCart(kanap) {
    document.getElementById("addToCart").addEventListener("click", (button) => {
//initialisation d'une constante pour stocker les couleurs et la quantité
    const quantity = document.querySelector('#quantity');
    const quantityChoice = quantity.value;
    const color = document.querySelector('#colors');
    const colorChoice = color.value;
    console.log(colorChoice, quantityChoice);
      let cart = getProductsStorage();
      //console.log(cart)
      let foundKanap = cart.find(p => p.id == paramId);
      if (cart[foundKanap] != undefined) {
        cart[foundKanap].quantity++;
        if (cart[foundKanap].quantity <= 100) {
          cart[foundKanap].quantity = cart[foundKanap].quantity + quantityChoice;
        }
      } else {
        cart.push({ quantity: quantityChoice, color: colorChoice, id: paramId });
      }
      saveCart(cart);
      //console.log(saveCart)
      //button.preventDefault();
      console.log("Envoyé");
    //window.location.href = "./cart.html";
    })
    }

addToCart(kanap);
  //récupérer les produits du localStorage
      function getProductsStorage() {
      let items = localStorage.getItem("cart")
      //console.log(items)
        //tester si le panier est vide 
        if (items == null) {
          alert: "Votre panier est vide !"
          return []
        } else {
          return JSON.parse(items)
        }
      }

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart)
}

