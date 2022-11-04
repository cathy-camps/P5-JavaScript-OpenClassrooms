import {saveCart} from "./product.js"

//récupérer les produits de l'API 
fetch(`http://localhost:3000/api/products/`)
        .then((res) => res.json())
        .then((cart) => {
            console.log(cart)
//fonction affichage panier
        })
    .catch((error) => {
        window.alert("Une erreur est survenue !");
    })
  
//récupère l'item "cart" du localStorage
    async function displayCart() {
    await saveCart();
    for (let cart of carts) {
        //enregistrer dans une var le produit récupéré
        let cart = localStorage.getItem("cart");
        //ajout au panier du produit choisi 
        //tester si le panier est vide 
        if (cart == null) {
            alert: "Votre panier est vide";
            return [];
        } else {
            return JSON.parse(cart) 
            }
        }
//afficher le panier 
let articleCart = document.querySelector("article", "cart__item", "{product-ID}", "{product-color}");
let imgCart = document.querySelector(".cart__item__img");
let titleCart = document.querySelector('h2');
let detailsCart = document.querySelectorAll('p');

//insertion du texte descriptif des éléments     
imgCart.innerHTML = (`<img src= "${cart.imageUrl}" alt="${cart.altTxt}">`)
titleCart.textContent = `${cart.h2}`;
detailsCart.textContent = `${cart.detailsCart}`;
article.appendChild(imgCart);
article.appendChild(h2);
article.appendChild(p)
    }
displayCart();

//pouvoir retirer un produit du panier
function removeFromCart(product) {
    let cart = getCart();
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
            removeFromCart(foundProduct)
        } else {
            //enregistrer si le produit n'a pas été supprimé            
            saveCart(cart);
        }
    }
}

//calculer le nombre de produits dans le panier
function getNumberProduct() {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    return number;
}

//total
function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    return total
}
