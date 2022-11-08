//import { saveCart } from "./product.js"
//import { fetchProduct } from "./product.js"

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(saveCart)
}

//ajout au panier du produit choisi 
export function getCart(){
    let product = localStorage.getItem("product")
    console.log(getCart)
//tester si le panier est vide 
if (product == null) {
    alert: "Votre panier est vide !"
    return []
} else {
    return JSON.parse(product)
}

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
}
saveCart();

async function printCartItems(product) {
    await fetch(`http://localhost:3000/api/products/`)
    .then ((product) => product.json())
    .then((cart) => {
    for (let product of cart) {
//insertion balise <article>
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
        imgCart.inserAdjacentHTML = ('beforebegin', `<img src= "${product.imageUrl}" alt="${product.altTxt}">`)
        titleCart.textContent = `${product.h2}`;
        detailsCart.textContent = `${product.detailsCart}`;
        article.appendChild(imgCart);
        article.appendChild(h2);
        article.appendChild(p)
        };
//affichage de tous les produits
printCartItems();
    })
}

function getAllProducts() {
    let getStorage = getCart();
    getStorage.forEach((product) => {
        printCartItems(product);
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
document.querySelector(`cart__order__form input[type="submit"]`).addEventListener("click", (e) => {
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
    //document.querySelector(`cart__order__form input[name="firstName"]`).setCustomValidity(message personnalisé);
    if (valid) {
    console.log("le formulaire est ok")
    window.alert ("Formulaire envoyé");
    } else 
    window.alert("Erreur : veuillez vérifier votre saisie");
}
)
//return valid;