//convertir le LS en array
let newCart = Object.keys(product).map(function (key) {
    return [(key), product[key]]
});


//on récupère le nouvel array comprenant (cart + newCart)
let newArray = newCart.concat(product);
console.log(newArray);


let foundKanap = cart.find(p => p.id == paramId);
//console.log(foundKanap)
if (cart[foundKanap] != null) {
    cart[foundKanap].quantityChoice;
    if (cart[foundKanap].quantity <= 100) {
        cart[foundKanap].quantity = cart[foundKanap].quantity + quantityChoice;
    }
} else {
    cart.push({ quantity: quantityChoice, color: colorChoice, id: paramId });
}
saveCart(cart);
console.log(saveCart)
button.preventDefault();
console.log("Envoyé");
  //window.location.href = "./cart.html";


//récupère le panier (cart = tableau)
function saveCart(cart) 

//localStorage
localStorage.setItem('casquette', '20');
localStorage.removeItem('casquette', '20');

//sessionStorage
sessionStorage.setItem('watchtime', '500');
sessionStorage.removeItem('watchtime');

//cookies
document.cookie = `voiture=audi; expires=${new Date(2022, 11, 17).toUTCString()}`
document.cookie = `voiture=; expires=${new Date(0).toUTCString()}`
console.log(new Date(0));

export async function getCart() {
    let product = await fetch(`http://localhost:3000/api/products/`)
        .then((res) => res.json())
        .then((cart) => {
            return cart
        })
    }

const printKanaps = async () => {
    await getCart();
    for (let cart of carts) {
        //insertion balise <article>
        let article = document.createElement("article");
        document.querySelector("#cart__items");
        article.appendChild(article);

        //insertion des images
        let img = document.createElement("img");
        img.src = `${product.imageUrl}`;
        img.alt = `${product.altTxt}`;
        article.appendChild(img);

        //insertion titre h3
        let h3 = document.createElement("h3");
        article.appendChild(h3);
        h3.classList.add("productName");
        h3.innerHTML = product.name;

        //insertion balise <p>
        let p = document.createElement("p");
        article.appendChild(p);
        p.classList.add("productDescription");
        p.innerHTML = product.description;
    }
} 
//affichage de tous les produits
printKanaps();


//afficher le panier 
let articleCart = document.querySelector("article", "cart__item", "{product-ID}", "{product-color}");
let imgCart = document.querySelector(".cart__item__img");
let titleCart = document.querySelector('h2');
let detailsCart = document.querySelectorAll('p');

//insertion du texte descriptif des éléments     
imgCart.inserAdjacentHTML = ('beforebegin', `<img src= "${cart.imageUrl}" alt="${cart.altTxt}">`)
titleCart.textContent = `${cart.h2}`;
detailsCart.textContent = `${cart.detailsCart}`;
article.appendChild(imgCart);
article.appendChild(h2);
article.appendChild(p)

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
    return total;
}

/** 
let getForm = document.querySelector("cart__order__form__question").addEventListener("submit", (input));
let firstNameForm = document.getElementById("#firstName");
let lastNameForm = document.getElementById("#lastName");
let adressForm = document.getElementById("#adress");
let cityForm = document.getElementById("#city");
let emailForm = document.getElementById("#email");
let orderForm = document.getElementById("#order");
*/