import { saveCart } from "./product.js"

//enregistrer le panier dans localstorage 
saveCart(cart);
console.log(saveCart)

//récupérer les produits du localStorage
export function getCart() {
    let product = localStorage.getItem("cart")
    console.log(getCart)
    //tester si le panier est vide 
    if (product == null) {
        alert: "Votre panier est vide !"
        return []
    } else {
        return JSON.parse(product)
    }
}

function printCart(cart) {
    fetch(`http://localhost:3000/api/products/`)
        .then((product) => product.json())
       let product = 0;
       console.log(product)
       do{
           let art = document.createElement("article").appendChild(art);
           document.querySelector(".cart__items" `data-id={product-ID}` `data-color"={product-color}`);

           let imgCart = document.querySelector(".cart__item__img");
           document.createElement("img");
           img.src = `${product.imageUrl}`;
           img.alt = `${product.altTxt}`;
           article.appendChild(img);

           let titleCart = document.querySelector('h2');
           let detailsCart = document.querySelectorAll('p');

           //insertion du texte descriptif des éléments     
           imgCart.createElement("img") = `<img src= "${product.imageUrl}" alt="${product.altTxt}">`
           titleCart.textContent = `${product.h2}`;
           detailsCart.textContent = `${product.detailsCart}`;
           article.appendChild(imgCart);
           article.appendChild(h2);
           article.appendChild(p)
           break;
       }
           while (product > 0);
           console.log(printCart); 
       }
saveCart();
printCart(cart);

document.querySelectorAll("addTocart").forEach(button => {
   button.addEventListener("change", (e) => {
   //cible le button (l'évènement)
   let quantity = e.currentTarget.closest("#addToCart").querySelector(".item__content__settings__quantity")(dataset.id);
   quantity.textContent = parseInt(quantity.textContent)+ 1;
    let color = e.currentTarget.closest("#addToCart").querySelector(".cart__item")(dataset.color);
   });
  }
  )

//pouvoir retirer un produit du panier
function removeCart(product) {
    let cart = getCart()
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
}
//changer la quantité 
function changeQuantity(product, quantity) {
    //regarder si le produit est dans le panier    
    let cart = getCart()
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        //si la quantité est à 0
        if (foundProduct.quantity <= 0) {
            removeCart(foundProduct)
        } else {
            //enregistrer si le produit n'a pas été supprimé            
            saveCart(cart);
        }
    }
}
//calculer le nombre de produits dans le panier
function NumberOfProducts() {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += parseInt(product.quantity);
    }
    return number;
}
//prix total du panier 
function TotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
}

function getAllProducts() {
    let getStorage = getCart();
    getStorage.forEach((product) => {
        printCart(product);
    }
    )
}

const input = document.querySelector('input');
const choice = document.querySelector(".itemQuantity");
input.closest(".itemQuantity")
input.addEventListener('change', updateValue)
function updateValue(e) {
    choice.textContent = e.target.value;
}

/**---------------------------------------------------------------*/

//récupérer le formulaire
/*document.querySelector(`cart__order__form input[type="submit"]`).addEventListener("click", (e) => {
e.preventDefault();
//vérifier si un champ est valide sinon renvoyer un message d'erreur
    let inputs = document.querySelectorAll(`cart__order__form input[name="firstName", name="lastName", name="address", name="email"]`).reportValidity();
    let valid = true;
    for (let input of inputs){
        valid &= reportValidity(input);
        if (!valid){
            break;
        }
    }
    document.querySelector(`cart__order__form input[name="firstName"]`).setCustomValidity/**(message personnalisé);*/
    /*if (valid) {
    console.log("le formulaire est ok")
    window.alert ("Formulaire envoyé");
    } else 
    window.alert("Erreur : veuillez vérifier votre saisie");*/
