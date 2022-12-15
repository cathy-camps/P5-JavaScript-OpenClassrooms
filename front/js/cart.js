
//récupérer les produits du LS
let items = JSON.parse(localStorage.getItem("cartInStorage"));
console.log(items) //array

const getKey = () => {
        let itemKey = localStorage.getItem(localStorage.key);
        for (let i=0; i < localStorage.length; i++) {
        const itemObject = JSON.parse(itemKey);
        cart.push(itemObject);
        console.log(itemObject)
    }
}

//requêter l'API pour récupérer les images et le prix du produit
function fetchProducts() {
    items.forEach((item) => {
    //array : console.log(items)
    fetch(`http://localhost:3000/api/products/{item.productId}`)
    .then((res) => res.json())
    .then((product) => {
        console.log(product)
        //displayProductsInLS)();
        return items;
        });
    })};
fetchProducts();

  let productChoice = {
        colors: items.color,
        quantity: items.quantity,
        productId: items.id
      }; 
      console.log(productChoice)

const displayProductsInLS = () => {
    for (let item of items) {
    //insertion de la balise article 
            const articleFromCart =  document.getElementById("#cart__items");
            const divArticle = document.createElement("article");
            divArticle.setAttribute("class", "cart__item");
            divArticle.setAttribute("data-id",`&{items.id}`)
            divArticle.setAttribute("data-color",`&{items.color}`)
            articleFromCart.appendChild(divArticle);
            console.log(divArticle)
   
    //insertion des images
            const divImg = document.createElement("div");
            divImg.setAttribute("class", ".cart__item__img");
            const img = document.createElement("img");
            img.setAttribute("src", '&{items.imgUrl}');
            img.setAttribute("src", '&{items.altTxt}');
            divArticle.appendChild(divImg);

    //insertion du titre et de la description
            const content = document.createElement("div");
            content.setAttribute("class", "cart__item__content");
            divArticle.appendChild(content);
            const description = document.createElement("div");
            description.setAttribute("class", "cart__item__content__description");
            content.appendChild(description);

            let h2 = document.createElement("h2");
            divArticle.appendChild(h2);
            h2.classList.add("cart__item__content__description");
            h2.textContent = items.description;
            description.appendChild(h2);

            const colors = document.createElement("p");
            colors.setAttribute("class", "color");
            colors.textContent = `${items.color}`;
            description.appendChild(colors);
         
            const price = document.createElement("p");
            price.setAttribute("class", "price");
            price.textContent = `${items.price}`;
            description.appendChild(price);

            //création div settings pour la quantité
            const settingsCart = document.createElement("div");
            settingsCart.setAttribute("class", "cart__item__content__settings");

            const settingsCartQuantity = document.createElement("div");
            settingsCart.setAttribute("class", "cart__item__content__settings__quantity");
            settingsCart.appendChild(settingsCartQuantity);

    //insertion de la quantité et des couleurs
            const quantity = document.querySelector(".cart__item__content__settings__quantity", "p")
            //const quantityChoice = quantity.value;
            const color = document.querySelector(".cart__item__content__description", "p")
            //const colorChoice = color.value;
            //console.log(colorChoice, quantityChoice);
            //const id = id.value;       
 }};

displayProductsInLS();


  
        /*
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

displayProductsInLS();/*

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