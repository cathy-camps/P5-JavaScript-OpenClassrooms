let items = [];

//récupérer les produits du LS
const getCart = () => {
  items = JSON.parse(localStorage.getItem("cartInStorage"));
  console.log(items);
};

const saveCart = () => {
  localStorage.setItem("cartInStorage", JSON.stringify(items));
};

//requêter l'API pour récupérer les images et le prix du produit
async function fetchProductsApi() {
  await getCart();
  let totalProduct = 0;
  let globalPrice = 0;
  const articleFromCart = document.getElementById("cart__items");
  articleFromCart.textContent = "";
  items.forEach((item) => {
    fetch(`http://localhost:3000/api/products/${item.productId}`)
      .then((res) => res.json())
      .then((product) => {
        let globalProduct = product;
        globalProduct.color = item.productColor;
        globalProduct.productQuantity = item.productQuantity;
        globalProduct.id = item.productId;
        displayProductsInLS(globalProduct);
        totalProduct += Number(item.productQuantity);
        globalPrice += Number(item.productQuantity * globalProduct.price);
        displayTotalPriceQuantity(totalProduct, globalPrice);
        deleteProductFromCart();
      });
  });
}
fetchProductsApi();

const displayProductsInLS = (globalProduct) => {
  //console.log(items);
  //insertion de la balise article
  const articleFromCart = document.getElementById("cart__items");
  const divArticle = document.createElement("article");
  divArticle.classList.add("cart__item");
  divArticle.dataset.id = globalProduct.id;
  divArticle.dataset.color = globalProduct.color;
  articleFromCart.appendChild(divArticle);
  //console.log(divArticle);

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
  h2.textContent = globalProduct.name;
  description.appendChild(h2);

  //insertion de la couleur
  const colors = document.createElement("p");
  colors.textContent = globalProduct.color;
  description.appendChild(colors);

  //insertion du prix
  const price = document.createElement("p");
  price.textContent = globalProduct.price + " €";
  description.appendChild(price);

  //création div settings pour la quantité
  const settingsCart = document.createElement("div");
  settingsCart.classList.add("cart__item__content__settings");
  content.appendChild(settingsCart);

  const settingsCartQuantity = document.createElement("div");
  settingsCartQuantity.classList.add("cart__item__content__settings__quantity");
  settingsCart.appendChild(settingsCartQuantity);

  const settingsQuantity = document.createElement("p");
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
  inputQuantity.value = globalProduct.productQuantity;
  inputQuantity.setAttribute("min", 1);
  inputQuantity.setAttribute("max", 100);

  //écouter la saisie de la quantité
  inputQuantity.addEventListener("input", (e) => {
    console.log(e);
    changeQuantity(e.target);
  });

  //création de l'élément div "supprimer"
  const deleteCart = document.createElement("div");
  deleteCart.classList.add("cart__item__content__settings__delete");
  settingsCart.appendChild(deleteCart);
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";
  deleteCart.appendChild(deleteItem);
};

//Récupérer le total des quantités
const displayTotalPriceQuantity = (totalProduct, globalPrice) => {
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = totalProduct;

  //calculer le prix total
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = globalPrice;
};

//modifier la quantité d'un produit
const changeQuantity = (inputQuantity) => {
  //regarder si le produit est dans le panier
  let newQty = Number(inputQuantity.value);
  if (newQty < 0 && newQty <= 100) {
    let articleToModify = input.closest("article");
    let colorProduct = articleToModify.dataset.id;
    getCart();
    items.forEach((item) => {
      item.addEventListener("input", (e) => {
        if (item.productId && item.productColor == colorProduct) {
          item.productQuantity = newQty;
        }
        newQty = parseInt(e.target.value);
        console.log(newQty);
      });
      saveCart();
      fetchProductsApi();
    });
  }
  //else {
  // alert ("La quantité doit être inférieure à 100");
};

const deleteProductFromCart = (globalProduct) => {
  let deleteButton = document.querySelectorAll(".deleteItem");
  deleteButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      let target = e.target.closest(".cart__item").dataset.id;
      let color = e.target.closest(".cart__item").dataset.color;
      let deleteProduct = e.target.closest(".deleteItem");
      let product = fetchProductsApi(globalProduct);
      console.log(product);
      product = product.filter((item) => {
        console.log(item);
        return item.id != target || item.color != color;
      });
      displayProductsInLS.remove();
      saveCart(product);
      getCart();
      changeQuantity();
    });
  });
};

/*-----------------------------Formulaire-------------------------------------*/

//sélection du bouton "commander" pour envoyer le formulaire
const btnSubmit = document.querySelector('#order');
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

//création d'un objet contenant les données du formulaire
const dataForm = {
firstName: document.querySelector('#firstName').value,
lastName: document.querySelector('#lastName').value,
address: document.querySelector('#address').value,
city: document.querySelector('#city').value,
email: document.querySelector('#email').value,
}
console.log(dataForm)

//sauvegarder l'objet "dataForm" dans le localStorage
localStorage.setItem('dataForm', JSON.stringify(dataForm));

//récupérer l'objet "dataForm" du localStorage et le mettre dans une variable
let dataStorage = localStorage.getItem('dataForm');

//convertir la chaine de caractères en objet
const dataStorageObject = JSON.parse(dataStorage);

console.log('dataStorageObject');
console.log(dataStorageObject);

/*
//function pour sauvegarder les données des champs du formulaire
const fields = document.getElementById("cart__order__form");
text = document.getElementById(('input').value), fields;

for (let i = fields.length; i++;) {
  field = fields[i];

if (text === fields[i].value) {
 fields.selected = true;
  break;
}
}*/

//initialisation du formulaire 
const getForm = () => {
let form = document.querySelector(".cart__order__form");

//initialisation des const pour les regex
//explications du patron :
/* 
^          Start of string  
[a-zA-Z]   Any character in the class a to z or A to Z  
+          One or more repititions  
(?:   )    Match expresion but don't capture
\s+        Whitespace, One or more repititions  
*          Zero or more repititions  
$          End of string*/

let regexName = new RegExp(`^[a-zA-Z]+(?:\s+[a-zA-Z]+)*.{3, 20}$`);
let regexAddress = new RegExp(`^[a-zA-Z0-9\s,.'-]{3,}$`);
let regexCity = new RegExp(`^[a-zA-Z\s]{3,}$`);
let regexEmail = new RegExp(`^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$`);

form.firstName.addEventListener('change', function() {
  let input = this.value;
  let isValid = validFirstName(input);
  if(!isValid) {
  invalidFirstName();
  }
});

form.lastName.addEventListener('change', function() {
  let input = this.value;
  let isValid = validLastName(input);
  if(!isValid) {
  invalidLastName();
  }
});

form.address.addEventListener('change', function() {
  let input = this.value;
  let isValid = validAddress(input);
  if(!isValid) {
  invalidAddress();
  }
});

form.city.addEventListener('change', function() {
  let input = this.value;
  let isValid = validAddress(input);
  if(!isValid) {
  invalidAddress();
  }
});
form.email.addEventListener('change', function() {
  let input = this.value;
  let isValid = validEmail(input);
  if(!isValid) {
  invalidEmail();
  }
});

const invalidFirstName = () => {
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  firstNameErrorMsg.textContent = "Votre prénom doit contenir 3 à 20 caractères";
};

const invalidLastName = () => {
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  lastNameErrorMsg.textContent = "Votre nom doit contenir 3 à 20 caractères";
};

const invalidAddress = () => {
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  addressErrorMsg.textContent = "Merci de renseigner votre adresse";
};

const invalidCity = () => {
  let cityErrorMsg = document.getElementById("cityErrorMsg");
  cityErrorMsg.textContent = "Merci de renseigner votre ville";
};

const invalidEmail = () => {
  let emailErrorMsg = document.getElementById("emailErrorMsg");
  emailErrorMsg.textContent = "Merci de renseigner votre email";
};

//récupération des données du formulaire 
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');
//console.log(inputFirstName);

//validation du prénom 
const validFirstName = (inputFirstName) => {
  return regexName.test(inputFirstName)
}

const validLastName = (inputLastName) => {
   return regexName.test(inputLastName)
}

const validAddress = (inputAddress) => {
   return regexAddress.test(inputAddress)
}

const validCity = (inputCity) => {
   return regexCity.test(inputCity)
}

const validEmail = (inputEmail) => {
   return regexEmail.test(inputEmail)
}
getForm();

//création de l'objet "produits sélectionnés" à envoyer au serveur
const sendToServer = {
  dataForm,
  dataStorage
}
console.log(sendToServer);
}});

/*
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
  
/*
document.querySelector(`cart__order__form input[name="firstName"]`).setCustomValidity/**(message personnalisé);
if (valid) {
console.log("le formulaire est ok")
window.alert ("Formulaire envoyé");
} else 
window.alert("Erreur : veuillez vérifier votre saisie");*/
//récupérer le formulaire et l'envoyer au serveur