
let newCartStorage = localStorage.getItem("newCart");
//console.log(newCartStorage)
let product = JSON.parse(newCartStorage);
console.log(product);

   

//tester si le panier est vide 
if (product === null){
alert: "Votre panier est vide !"
};
    
//récupérer l'index des produits du LS
const key = {}
for (let i = 0; i < localStorage.length; i++) {
    let productValue = localStorage.key(i);
    console.log(`Item at ${i}: ${productValue}`);
}

//on met à jour le nouvel array
function update(newCartStorage) {
    if (newCartStorage.length === O) {
        localStorage.removeItem("newCart");
    }else {
        localStorage.setItem("newCart", JSON.stringify(product));
    }
    console.log(update(newCartStorage));
}

//on déclare une constante pour récupérer le prix, la photo et le texte alt de chaque produit du panier 
const productDetails = {
    price: product.price,
    image: product.imageUrl,
    textAlt: product.altTxt,
    id : product._id,
}

//requêter l'API pour récupérer les images et le prix du produit
const displayProductsInLS = () => {
    if (product !== null) {
        console.log(newCartStorage)
        for (let i = 0; i < product.length; i++) {
        fetch(`http://localhost:3000/api/products/${product._id}`)
        .then((res) => res.json())
        .then((productDetails) => {
        console.log(productDetails);
                //insertion de la balise article
                const parent = document.querySelector("#cart__items");
                const article = document.createElement("article");
                article.classList.add("#cart__items");
                parent.appendChild(article);
                //article.setAttribute("data-id",`{key}`);
                console.log(article);
                //insertion de la div qui accueillera les images
                const divImg = document.createElement("div");
                parent.appendChild(divImg);
                divImg.className = (".cart__item__img");
                //insertion des images
                let img = document.createElement("img");
                document.querySelector(".cart__item__img");
                img.src = `${product.imageUrl}`;
                img.alt = `${product.altTxt}`;
                divImg.appendChild(img);
                console.log(img)
                
                //insertion de la quantité et des couleurs
                const quantity = document.querySelector(".cart__item__content__settings__quantity", "p")
                //const quantityChoice = quantity.value;
                const color = document.querySelector(".cart__item__content__description", "p")
                //const colorChoice = color.value;
                //console.log(colorChoice, quantityChoice);
                //const id = id.value;

                //insertion du titre et de la description
                const content = document.createElement("div");
                content.classList.add("cart__item__content");
                const description = document.createElement("div");
                description.classList.add("cart__item__content__description");

                let h2 = document.createElement("h2");
                article.appendChild(h2);
                h2.classList.add("cart__item__content__description");
                h2.textContent = product.description;

                const colors = document.createElement("p");
                //color.textContent = `${product.color}`
                const price = document.createElement("p");
                price.textContent = `${key.price}`;

                content.appendChild(description);
                description.appendChild(h2);
                //description.appendChild(color);
                description.appendChild(price);    
                       })
                .catch((error) => {
                    window.alert("Une erreur est survenue !");
                })
        };
        
    }}
//pouvoir retirer un produit du panier
function removeFromCart(product_id) {
    let cart = getCart();
    cart = cart.filter(p => p.id != product_id);
    console.log(product_id)
    saveCart(cart);
}

//calculer le prix total du panier
function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
}
 
//changer la quantité 
function changeQuantity(product_id, quantity) {
    //regarder si le produit est dans le panier    
    let cart = getCart()
    let foundProduct = cart.find(p => p_id == product_id);
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
        number += parseInt(product.quantity);
    }
    return number;
}

displayProductsInLS();

/*---------------------formulaire-------------------------------------*/
/*let getForm = document.querySelector("cart__order__form__question");
//ecouter la modification du prénom
getForm.firstName.addeventListener('change', function () {
    validFirstName(this);
});

//écouter la modification du prénom
let firstNameForm = document.getElementById("#firstName");
const validFirstName = function(inputFirstName) {
    let firstNameRegExp = new RegExp(
    '([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*', 'g'
    )
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    console.log(testFirstName);
};

//écouter la modification du nom
getForm.lastName.addeventListener('change', function () {
    validLastName(this);
});
let lastNameForm = document.getElementById("#lastName");
const validLastName = function (inputLastName) {
    let lastNameRegExp = new RegExp(
        '([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*', 'g'
    )
};
let testLastName = lastNameRegExp.test(inputLastName.value);
console.log(testLastName);
//récupération balise message d'erreur     
let firstNameErrorMsg = inputFirstName.nextElementSibling;
//test de l'expression régulière
  if (testFirstName) {
    small.innerText = "Adresse valide";
    small.classList.add = ("Success");
  } else {
    small.innerText = "Adresse non valide";
  }

  //écouter la modification de l'adresse
let adressForm = document.getElementById("#adress");
const validAdress = function (inputAdress) {
    let adressRegExp = new RegExp(
        `^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$`
    )
};
let testAdress = adressRegExp.test(inputAdress.value);
console.log(testAdress);

getForm.adress.addeventListener('change', function () {
    validAdress(this);
});

//écouter la modification de la ville
let cityForm = document.getElementById("#city");
const validCity = function (inputCity) {
    let cityRegExp = new RegExp(
        '([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*', 'g'
    )
};
let testCity = cityRegExp.test(inputCity.value);
console.log(testCity);

getForm.city.addeventListener('change', function () {
    validCity(this);
});

//ecouter la modification de l'email
let emailForm = document.getElementById("#email");
const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp(
        `^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$`
    )
};
let testEmail= emailRegExp.test(inputEmail.value);
console.log(testEmail);

getForm.email.addeventListener('change', function () {
    validEmail(this);
});

//ecouter le button commander
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
document.querySelector(`cart__order__form input[name="firstName"]`).setCustomValidity/**(message personnalisé);
if (valid) {
console.log("le formulaire est ok")
window.alert ("Formulaire envoyé");
} else 
window.alert("Erreur : veuillez vérifier votre saisie");
//récupérer le formulaire et l'envoyer au serveur 
*/