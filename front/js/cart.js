
//récupérer les produits du LS
let items = JSON.parse(localStorage.getItem("cartInStorage"));
console.log(items) //array

//requêter l'API pour récupérer les images et le prix du produit
function fetchProductsApi() {
    items.forEach((item) => {
    fetch(`http://localhost:3000/api/products/${item.productId}`)
    .then((res) => res.json())
    .then((product) => {
        let globalProduct = product;
        globalProduct.color = item.productColor;
        globalProduct.productQuantity = item.productQuantity;
        globalProduct.id = item.productId;
        displayProductsInLS(globalProduct);
        })
    })};
fetchProductsApi();

const displayProductsInLS = (globalProduct) => {
    console.log(items);
    //insertion de la balise article 
            const articleFromCart =  document.getElementById("cart__items");
            const divArticle = document.createElement("article");
            divArticle.classList.add("cart__item");
            divArticle.dataset.id = globalProduct.id;
            divArticle.dataset.color = globalProduct.color;
            articleFromCart.appendChild(divArticle);
            console.log(divArticle)
   
    //insertion des images
            const divImg = document.createElement("div");
            divImg.classList.add("cart__item__img");
            const img = document.createElement("img");
            img.setAttribute("src", globalProduct.imageUrl);
            img.setAttribute("alt", globalProduct.altTxt);
            divImg.appendChild(img);
            divArticle.appendChild(divImg);

    //insertion du titre et de la description
            const content = document.createElement("div");
            content.classList.add("cart__item__content");
            divArticle.appendChild(content);
            const description = document.createElement("div");
            description.classList.add("cart__item__content__description");
            description.textContent = globalProduct.description;
            content.appendChild(description);

            let h2 = document.createElement("h2");
            divArticle.appendChild(h2);
            h2.classList.add("h2");
            h2.textContent = globalProduct.name;
            description.appendChild(h2);

            //insertion de la couleur
            const colors = document.createElement("p");
            colors.classList.add("color");
            colors.textContent = globalProduct.color;
            description.appendChild(colors);
         
            //insertion du prix
            const price = document.createElement("p");
            price.classList.add("price");
            price.textContent = globalProduct.price + " €";
            description.appendChild(price);

            //création div settings pour la quantité
            const settingsCart = document.createElement("div");
            settingsCart.classList.add("cart__item__content__settings");
            divArticle.appendChild(settingsCart);

            const settingsCartQuantity = document.createElement("div");
            settingsCartQuantity.classList.add("cart__item__content__settings__quantity");
            settingsCart.appendChild(settingsCartQuantity);

            const settingsQuantity = document.createElement("p");
            settingsCartQuantity.classList.add("quantity");
            settingsQuantity.textContent = "Qté : ";
            settingsCartQuantity.appendChild(settingsQuantity);

             //création de l'élément input quantité
            const inputQuantity = document.createElement("input");
            let productQty = "";
            inputQuantity.classList.add("itemQuantity");
            document.querySelector(`input[type="number"]`);
            settingsCartQuantity.appendChild(inputQuantity);
            //console.log(inputQuantity);
            inputQuantity.type = "number";
            inputQuantity.name = "itemQuantity";
            inputQuantity.value = items.productQuantity;
            inputQuantity.valMax = "100";
            inputQuantity.valMin = "1";

            inputQuantity.addEventListener("input", (e) => {
            console.log(e)
            productQty = (e.target.value);
            console.log(productQty);
               })
            }
            
/*
            //création de l'élément div "supprimer"
            const deleteCart = document.createElement("div");
            deleteCart.classList.add("cart__item__content__settings__delete");
            settingsCart.appendChild(deleteCart);
            const deleteItem = document.createElement("p");
            deleteItem.classList.add("deleteItem");
            deleteItem.textContent = "Supprimer";
            deleteCart.appendChild(deleteItem);      */     


 //Récupérer le total des quantités 
const displayTotalPriceQuantity = ()  => {
const productQty = document.querySelectorAll("itemQuantity");
  const totalQty = productQty.length;
  let total = 0;

  for (let i=0; i < totalQty; i++) {
    total += productQty[i].valueASNumber;
  }
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = total;
  console.log(total);

  //calculer le prix total
  let price = 0;
  for (let i=0; i < totalQty; i++) {
    price += (productQty[i]).valueASNumber * items[i].globalProduct.price;
  }
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = price;
  console.log(price);
}
displayTotalPriceQuantity();

//modifier la quantité d'un produit 
const changeQuantity = () => {
    let updateQuantity = document.querySelectorAll("itemQuantity");
    for (let q = 0; q < updateQuantity.length; q++){
        updateQuantity[q].addEventListener("change", (e) => {
            e.target.value;

//regarder si le produit est dans le panier 
let modifQuantity = items[q].productQuantity;
let modifValue = updateQuantity[q].valueAsNumber;
    let foundProduct = items.find((el) => el.modifValue != modifQuantity);
        foundProduct.productQuantity = modifValue;
        items[q].productQuantity = foundProduct.productQuantity;
        localStorage.setItem("product", JSON.stringify(items));
        //rafraichir la page
        location.reload();
        });
    }};
    changeQuantity();

    /*
//supprimer un produit du panier
function removeFromCart(product_id) {
    cart = cart.filter(p => p.id != product_id);
    console.log(product_id)
}

//calculer le nombre de produits dans le panier
const NumberOfProducts = () => {
    let number = 0;
    for (let product of cart) {
        number += parseInt(item.productQuantity);
    }
    return number;
} */

/*-----------------------------récupération du formulaire-------------------------------------*/
const getForm = () => {
    document.querySelector("cart__order__form");

//ecouter la modification du prénom
getForm.firstName.addeventListener('change', function () {
    validFirstName(this);
});
//validation du prénom 
getForm.firstName = document.getElementById("#firstName");
const validFirstName = function(inputFirstName) {
    let firstNameRegExp = new RegExp(
    '([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*', 'g'
    )
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    console.log(testFirstName);
};

//récupération balise message d'erreur     
let firstNameErrorMsg = inputFirstName.nextElementSibling;
//test de l'expression régulière
  if (testFirstName) {
    small.innerText = "Champ valide";
    small.classList.add = ("Success");
  } else {
    small.innerText = "Champ non valide";
  }

//écouter la modification du nom
getForm.lastName.addeventListener('change', function () {
    validLastName(this);
});
getForm.lastName = document.getElementById("#lastName");
const validLastName = function (inputLastName) {
    let lastNameRegExp = new RegExp(
        '([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*', 'g'
    )
};
let testLastName = lastNameRegExp.test(inputLastName.value);
console.log(testLastName);

//récupération balise message d'erreur     
let lastNameErrorMsg = inputLastName.nextElementSibling;
//test de l'expression régulière
  if (testLastName) {
    small.innerText = "Champ valide";
    small.classList.add = ("Success");
  } else {
    small.innerText = "Champ non valide";
  }

//écouter la modification de l'adresse
getForm.adress.addeventListener('change', function () {
validAdress(this);

let adressForm = document.getElementById("#adress");
const validAdress = function (inputAdress) {
    let adressRegExp = new RegExp(
        `^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$`
    )
};
let testAdress = adressRegExp.test(inputAdress.value);
console.log(testAdress);
});

//récupération balise message d'erreur     
let adressErrorMsg = inputAdress.nextElementSibling;
//test de l'expression régulière
  if (testAdress) {
    small.innerText = "Adresse valide";
    small.classList.add = ("Success");
  } else {
    small.innerText = "Adresse non valide";
  }

//écouter la modification de la ville
getForm.city.addeventListener('change', function () {
    validCity(this);
let cityForm = document.getElementById("#city");
const validCity = function (inputCity) {
    let cityRegExp = new RegExp(
        '([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*', 'g'
    )
};
let testCity = cityRegExp.test(inputCity.value);
console.log(testCity);
});
//récupération balise message d'erreur     
let cityErrorMsg = inputCity.nextElementSibling;
//test de l'expression régulière
  if (testCity) {
    small.innerText = "Ville valide";
    small.classList.add = ("Success");
  } else {
    small.innerText = "Ville non valide";
  }

//ecouter la modification de l'email
getForm.email.addeventListener('change', function () {
    validEmail(this);
let emailForm = document.getElementById("#email");
const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp(
        `^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$`
    )
};
let testEmail= emailRegExp.test(inputEmail.value);
console.log(testEmail);
});
//récupération balise message d'erreur     
let emailErrorMsg = inputEmail.nextElementSibling;
//test de l'expression régulière
  if (testEmail) {
    small.innerText = "Email valide";
    small.classList.add = ("Success");
  } else {
    small.innerText = "Email non valide";
  }

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
        }};
      });
    };
/*
document.querySelector(`cart__order__form input[name="firstName"]`).setCustomValidity/**(message personnalisé);
if (valid) {
console.log("le formulaire est ok")
window.alert ("Formulaire envoyé");
} else 
window.alert("Erreur : veuillez vérifier votre saisie");*/
//récupérer le formulaire et l'envoyer au serveur 