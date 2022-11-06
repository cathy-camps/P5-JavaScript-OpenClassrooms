import { saveCart } from "./product.js"

export function getCart() {
    fetch(`http://localhost:3000/api/products/`)
        .then((res) => res.json())
        .then((cart) => {
            return cart;
        })

    //récupère l'item "cart" du localStorage
    //enregistrer dans une var le produit récupéré
        let cart = localStorage.getItem("cart")
    //ajout au panier du produit choisi 
    //tester si le panier est vide 
        if (cart == null) {
            alert: "Votre panier est vide"
            return []
        } else {
            return JSON.parse(cart)
        }
    }

    //pouvoir retirer un produit du panier
    function removeCart(product) {
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
            number += product.quantity;
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

    //afficher les éléments du panier 
    let cart = getCart();
    const printCart = async () => {
        await getCart();
        for (let product of cart) {
            //insertion balise <article>
            let art = document.createElement("article");
            document.querySelector("#cart__items").appendChild(article);
            let articleCart = document.querySelector("article", "cart__item", "{product-ID}", "{product-color}");
            let imgCart = document.querySelector(".cart__item__img");
            let titleCart = document.querySelector('h2');
            let detailsCart = document.querySelectorAll('p');

            //insertion du texte descriptif des éléments     
            imgCart.inserAdjacentHTML = ('beforebegin', `<img src= "${product.imageUrl}" alt="${product.altTxt}">`)
            titleCart.textContent = `${product.h2}`;
            detailsCart.textContent = `${product.detailsCart}`;
            article.appendChild(imgCart);
            article.appendChild(h2);
            article.appendChild(p)
        }
    }
    //affichage de tous les produits
    printCart();



