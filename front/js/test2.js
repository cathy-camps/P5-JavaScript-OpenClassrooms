kanaps.forEach(kanap => {
    Object.entries(kanap).forEach(["cart", (quantity, color, _id)])
})

    

const parent = document.getElementById("cart__items");
 const article = document.createElement("article");
 article.classList.add("cart__items");
 parent.appendChild(article);
 console.log(article)

 const imgKanap = document.querySelector("div .cart__item__img");
 document.createElement('img');
 imgKanap.src = `{product-imageUrl}`;
 imgKanap.alt = `{product-altTxt}`;
 article.append(imgKanap);

 const content = document.createElement("div"); 
 content.classList.add("cart__item__content");
 const description = document.createElement("div");
 description.classList.add("cart__item__content__description");
 const h2 = document.createElement("h2");
 h2.textContent = `{product-name}`
 const color = document.createElement("p");
 color.textContent = `{product-color}`
 const price = document.createElement("p");
 price.textContent = `{product-price}`;

 content.appendChild(description);
 description.appendChild(h2);
 description.appendChild(color);
 description.appendChild(price);

const product = [`{product-ID}`, `{product-color}`, `{product-quantity}`, `{product-name}`, `{product-price}`, `{product-imageUrl}`, `{product-altTxt}`, `{product-description}`];
console.log(Object.keys(product))

function displayCart(kanap) {
    if (kanap) {
        kanap.forEach((kanap) => {
            const cartDetails = document.querySelector(".cart__items");
            let article = document.createElement('article');
            article.setAttribute("cart__item", "data-id", "data-color");
            cartDetails.appendChild(article)
            console.log(article)

            const img = document.querySelector(".cart__item__img");
            document.createElement('img');
            img.src = `${kanap.imageUrl}`;
            img.alt = `${kanap.altTxt}`;
            article.append(img)
        })
    } else {
        console.error("panier vide")
    }
}

const quantity = document.querySelector(".cart__item__content__settings__quantity")
const kanap = [`{product-ID}`, `{product-color}`, quantity];
console.log(Object.keys(kanap));



//insertion balise <article>
let section = document.querySelector(".cart #cart__items");
document.createElement('article');
console.log(section)




saveCart();

function getProductsStorage() {
    let items = localStorage.getItem("items")
    //tester si le panier est vide 
    if (items == null) {
        alert: "Votre panier est vide !"
        return []
    } else {
        return JSON.parse(items)
    }
}

console.log(getProductsStorage())





async function displayProductsCart() {
        await fetch(`http://localhost:3000/api/products/`)
        .then((items) => {
            console.log(typeof items)


        })}
    displayProductsCart();
    console.log(displayProductsCart())
    

let cart = saveCart();
const kanapInStorage = localStorage.getItem("cart", JSON.stringify(cart));
console.log(kanapInStorage)
if (kanapInStorage >= 0 && kanapInStorage <= 100) {
    cart.JSON.parse(kanapInStorage);
} 

function getProductsStorage() {
    let cart = localStorage.getItem("cart")
    //tester si le panier est vide 
    if (cart == null) {
        alert: "Votre panier est vide !"
        return []
    } else {
        return JSON.parse(cart)
    }
}



async function displayCart() {
    return await fetch(`http://localhost:3000/api/products/`)
        .then((res) => res.json())
        .then((detailsCart) => {
            let details = detailsCart
            console.log(details);
            return details;
        })
        .catch((error) => {
            window.alert("Une erreur est survenue !");
        });
}

displayCart();

function printCart() {
    fetch(`http://localhost:3000/api/products/`)
        .then((product) => product.json())
    let product = 0;
    console.log(product)
        let article = document.createElement("article").appendChild(article);
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
       
    }
    console.log(printCart);

saveCart(cart);
printCart();

document.querySelectorAll("addTocart").forEach(button => {
    button.addEventListener("change", (e) => {
        //cible le button (l'évènement)
        let quantity = e.currentTarget.closest("#addToCart").querySelector(".item__content__settings__quantity")(dataset.id);
        quantity.textContent = parseInt(quantity.textContent) + 1;
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



