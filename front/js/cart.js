let items = [];

//Récupérer les produits du LS 
const getCart = () => {
  items = JSON.parse(localStorage.getItem("cartInStorage"));
  console.log(items);
};

//Sauvegarder les éléments du panier dans le LS
const saveCart = () => {
  localStorage.setItem("cartInStorage", JSON.stringify(items));
};

//requêter l'API pour récupérer les infos du produit et les afficher dans le panier de l'utilisateur (total des produits et le prix total) + mettre à jour les infos 
async function fetchProductsApi() {
  await getCart();
  let totalProduct = 0;
  let globalPrice = 0;
//récupérer l'élément HTML qui va contenir les articles du panier
  const articleFromCart = document.getElementById("cart__items");
  articleFromCart.textContent = "";
  if(items.length >= 0) {
//itérer sur les éléments du panier
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
      })
  })
  }else{
    displayTotalPriceQuantity(totalProduct, globalPrice);
  }
};
fetchProductsApi();

//Gérer l'affichage des produits dans le panier : contient les infos récupérées par l'API pour créer les éléments HTML et les insérer dans le DOM
  function displayProductsInLS(globalProduct) {
  //insertion de la balise article
  const articleFromCart = document.getElementById("cart__items");
  const divArticle = document.createElement("article");
  divArticle.classList.add("cart__item");
  divArticle.dataset.id = globalProduct.id;
  divArticle.dataset.color = globalProduct.color;
  articleFromCart.appendChild(divArticle);

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

  //création de l'élément div "supprimer" avec un écouteur d'évènement
  const deleteCart = document.createElement("div");
  deleteCart.classList.add("cart__item__content__settings__delete");
  settingsCart.appendChild(deleteCart);
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";
  deleteCart.appendChild(deleteItem);

  deleteCart.addEventListener("click", (e) => {
    deleteProduct(e.target);
  });
};

//Récupérer le total des quantités
const displayTotalPriceQuantity = (totalProduct, globalPrice) => {
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = totalProduct;

//calculer le prix total
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = globalPrice;
};

//Modifier la quantité d'un produit
const changeQuantity = (inputQuantity) => {
  //regarder si le produit est dans le panier
  let newQty = Number(inputQuantity.value);
  if (0 < newQty  && newQty <= 100) {
    let articleToModify = inputQuantity.closest("article");
    let colorProduct = articleToModify.dataset.color;
    let idProduct = articleToModify.dataset.id;
    getCart();
    items.forEach((item) => {
        if (item.productId == idProduct && item.productColor == colorProduct) {
          item.productQuantity = newQty;
        }
      });
      saveCart();
      fetchProductsApi();
    }
    else{
      alert("la quantité ne doit pas dépasser 100")
    }
  };

//Supprimer un produit 
const deleteProduct = (btnDelete) => {
  let articleToDelete = btnDelete.closest("article");
  let colorProduct = articleToDelete.dataset.color;
  let idProduct = articleToDelete.dataset.id;
  getCart();
  let oldItems = items;
  items = [];
  oldItems.forEach((item) => {
    if (item.productColor != colorProduct && item.productId != idProduct) {
      items.push(item);
    }
  })
  saveCart();
  fetchProductsApi();
};

/*-----------------------------Formulaire-------------------------------------*/
//sélection du bouton "commander" pour envoyer le formulaire
const btnSubmit = document.querySelector('#order');
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  submitForm();
});

//récupérer l'objet "dataForm" du localStorage et le mettre dans une variable
let dataStorage = localStorage.getItem('dataForm');
//convertir la chaine de caractères en objet
const dataStorageObject = JSON.parse(dataStorage);

//Envoyer les données du formulaire après controle de la validité des données saisies 
const submitForm = () => {
  if (controlForm()) {
    const dataForm = {
      firstName: document.querySelector('#firstName').value.trim(),
      lastName: document.querySelector('#lastName').value.trim(),
      address: document.querySelector('#address').value.trim(),
      city: document.querySelector('#city').value.trim(),
      email: document.querySelector('#email').value.trim(),
    }
    let productsId = [];
    getCart();
    for (let kanapId of items) {
      productsId.push(kanapId.productId);
    }
    fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      body: JSON.stringify({contact:dataForm,products:productsId}),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      return res.json();
    }).then((res) => {
      localStorage.clear();
      window.location.href = `confirmation.html?orderId=${res.orderId}`
    }
    )
    //console.log(dataForm)
    //console.log("ok pour envoi")
  }
};

//Contrôler la saisie du formulaire avec la mise en place des regex
function controlForm() {
  let success = true;
  let failed = false;
  let regexName = new RegExp(`^[a-zA-Z ]{3,20}$`);
  let regexAddress = new RegExp(`^[a-zA-Z0-9\s,.'-]{3,}$`);
  let regexCity = new RegExp(`^[a-zA-Z\s]{3,}$`);
  let regexEmail = new RegExp(`^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$`);
  const dataForm = {
    firstName: document.querySelector('#firstName').value.trim(),
    lastName: document.querySelector('#lastName').value.trim(),
    address: document.querySelector('#address').value.trim(),
    city: document.querySelector('#city').value.trim(),
    email: document.querySelector('#email').value.trim(),
  }
  getCart();
  if(items.length <= 0) {
    alert("Votre panier est vide");
    failed;
  }
  if (!regexName.test(dataForm.firstName)) {
    invalidFirstName();
    failed;
  } else {
    validFirstName();
    success;
  };
  if (!regexName.test(dataForm.lastName)) {
    invalidLastName();
    failed;
  } else {
    validLastName();
    success;
  }
  if (!regexAddress.test(dataForm.address)) {
    invalidAddress();
  failed; 
  } else {
    validAddress();
    success;
  }
  if (!regexCity.test(dataForm.city)) {
    invalidCity();
   failed;
  } else {
    validCity();
    success; 
  }
  if (!regexEmail.test(dataForm.email)) {
    invalidEmail();
  failed; 
  } else {
    validEmail();
    success;
  };
  return success;
};

//validation du prénom 
const invalidFirstName = () => {
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  firstNameErrorMsg.textContent = "Votre prénom doit contenir 3 à 20 caractères";
};

const validFirstName = () => {
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  firstNameErrorMsg.textContent = "";
};

//validation du nom
const invalidLastName = () => {
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  lastNameErrorMsg.textContent = "Votre nom doit contenir 3 à 20 caractères";
};

const validLastName = () => {
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  lastNameErrorMsg.textContent = "";
};

//validation de l'adresse 
const invalidAddress = () => {
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  addressErrorMsg.textContent = "Merci de renseigner votre adresse";
};

const validAddress = () => {
  let addressErrorMsg = document.getElementById("addressErrorMsg");
  addressErrorMsg.textContent = "";
};

//validation de la ville 
const invalidCity = () => {
  let cityErrorMsg = document.getElementById("cityErrorMsg");
  cityErrorMsg.textContent = "Merci de renseigner votre ville";
};

const validCity = () => {
  let cityErrorMsg = document.getElementById("cityErrorMsg");
  cityErrorMsg.textContent = "";
};

//validation de l'email 
const invalidEmail = () => {
  let emailErrorMsg = document.getElementById("emailErrorMsg");
  emailErrorMsg.textContent = "Merci de renseigner votre email";
};

const validEmail = () => {
  let emailErrorMsg = document.getElementById("emailErrorMsg");
  emailErrorMsg.textContent = "";
};

controlForm();


