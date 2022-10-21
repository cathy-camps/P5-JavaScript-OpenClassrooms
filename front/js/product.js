//récupérer l'URL de la page produit
const productUrl = window.location.href;
const urlParams = new URL(productUrl);
const idParams = urlParams.searchParams.get("id");
console.log(idParams)

//récupérer l'id du produit à afficher
  fetch("http://localhost:3000/api/products/" + idParams)
  .then((res) => res.json())
  console.log("success")
  .then((product) => { //insertion des éléments selon leur id
    document.querySelector(".item__img").innerHTML = 'img src="${product.imageUrl}", alt="${product.altTxt}"`;
)
}
