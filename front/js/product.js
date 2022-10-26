
const urlValue = window.location.search;
const urlParams = new URLSearchParams(urlValue);
const paramId = urlParams.get('id');
console.log(paramId)

//récupérer le produit de l'API via son ID
function fetchProduct() {
  fetch(`http://localhost:3000/api/products/${paramId}`)
    .then((res) => res.json())
    .then((kanap) => {

//récupération des éléments HTML
      let imgKanap = document.querySelector(".item__img");
      let title = document.getElementById('title');
      let descriptionKanap = document.getElementById('description');
      let priceKanap = document.getElementById('price');
//insertion du texte descriptif des éléments     
      imgKanap.innerHTML = `<img src= "${kanap.imageUrl}" alt="${kanap.altTxt}">`
      title.textContent = `${kanap.name}`;
      priceKanap.innerHTML = `${kanap.price}`;
      descriptionKanap.innerHTML = `${kanap.description}`;
      
//initialisation d'une constante pour stocker les couleurs
const colors = kanap.colors
//récupérer le sélecteur pour le choix des couleurs
let select = document.querySelector("select");
//création d'une boucle pour sélectionner la couleur du produit
for (let color of kanap.colors) {
  let choice = document.createElement('option');
  choice.textContent = color;
  choice.value = color;
  select.appendChild(choice);
}

console.log(kanap, "success")
    })
    .catch((error) => {
      window.alert("Une erreur est survenue !");
    })
}
fetchProduct();
