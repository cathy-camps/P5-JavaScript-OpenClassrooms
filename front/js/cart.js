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
  console.log(items);
  //insertion de la balise article
  const articleFromCart = document.getElementById("cart__items");
  const divArticle = document.createElement("article");
  divArticle.classList.add("cart__item");
  divArticle.dataset.id = globalProduct.id;
  divArticle.dataset.color = globalProduct.color;
  articleFromCart.appendChild(divArticle);
  console.log(divArticle);

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

/*-----------------------------récupération du formulaire-------------------------------------*/

//explications du patron :
/* 
^          Start of string  
[a-zA-Z]   Any character in the class a to z or A to Z  
+          One or more repititions  
(?:   )    Match expresion but don't capture
\s+        Whitespace, One or more repititions  
*          Zero or more repititions  
$          End of string
*/

//initialisation des const pour les regex
let regexName = `^[a-zA-Z]+(?:\s+[a-zA-Z]+)*.{2}$`;
let regexAddress = `^[#.0-9a-zA-Z\s,-]+{5}$`;
let regexCity = `^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*{3}$`;
let regexEmail = `/^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/`;

const invalidFirstName = (regexName) => {
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  firstNameErrorMsg.textContent = "Merci de renseigner votre prénom";
};

const invalidLastName = (regexName) => {
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  lastNameErrorMsg.textContent = "Merci de renseigner votre nom";
};

const invalidAddress = (regexAddress) => {
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  addressErrorMsg.textContent = "Merci de renseigner votre adresse";
};

const invalidCity = (regexCity) => {
  let cityErrorMsg = document.getElementById("cityErrorMsg");
  cityErrorMsg.textContent = "Merci de renseigner votre ville";
};

const invalidEmail = (regexEmail) => {
  let emailErrorMsg = document.getElementById("emailErrorMsg");
  emailErrorMsg.textContent = "Merci de renseigner votre email";
};

/*document.getElementById("firstName").addEventListener("input", function(){
const invalidLastName = (regexName) => {
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  lastNameErrorMsg.textContent = "Merci de renseigner votre nom";
};
}
)*/

//récupération du formulaire
document.querySelector(".cart__order__form").addEventListener("submit", function (e) {
    //e.preventDefault();

    //validation du champ nom
    let validFirstName = document.getElementById("firstName");
    if (!validFirstName.value) {
      invalidFirstName();
    }

    //validation du champ prénom
    let validLastName = document.getElementById("lastName");
    if (!validLastName.value);
    {
      invalidLastName();
    }

    //validation du champ adresse
    let validAddress = document.getElementById("address");
    if (!validAddress.value) {
      invalidAddress();
    }

    //validation du champ ville
    let validCity = document.getElementById("city");
    if (!validCity.value) {
      invalidCity();
    }

    //validation du champ email
    let validEmail = document.getElementById("email");
    if (!validEmail.value) {
      invalidEmail();
    }
    alert("Formulaire envoyé");
    console.log("ok");
  });

/*
const validateForm = () => {
  let firstName = document.forms["form"]["firstName"];
  let lastName = document.forms["form"]["lastName"];
  let address = document.forms["form"]["address"];
  let city = document.forms["form"]["city"];
  let email = document.forms["form"]["email"];

  if(firstName.value = "") {
    return firstNameErrorMsg;
  }
}

const attributeFocus = (input) => {
  document.getElementById(firstName).focus(input);
}

const input = document.querySelector("input");
const log = document.getElementById("firstName");
input.addEventListener("input", )
//ecouter la modification du prénom
getForm.firstName.addeventListener('change', function () {
    validFirstName(this);
});
//validation du prénom 
getForm.firstName = document.getElementById("firstName");
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
  
/*
document.querySelector(`cart__order__form input[name="firstName"]`).setCustomValidity/**(message personnalisé);
if (valid) {
console.log("le formulaire est ok")
window.alert ("Formulaire envoyé");
} else 
window.alert("Erreur : veuillez vérifier votre saisie");*/
//récupérer le formulaire et l'envoyer au serveur
