//jshint esversion: 8, asi: true
const items = document.getElementById('items');

//requête de l'API, récupérer les données
const getProducts = async() => {
  await fetch("http://localhost:3000/api/products/")
  .then((res) => res.json())
  .then((productList) => {
    products = productList
    console.log(products)
  })
  .catch((error) => {
    window.alert("Une erreur est survenue !")
  })
}

//création des éléments et affichage des données de l'API
const printKanaps = async() => {
  await getProducts();
  for(let product of products) {
//insertion élément "a"
  let link = document.createElement("a");
  document.querySelector("#items").appendChild(link);
  link.href = `./product.html?id=${product._id}`;

//insertion balise <article>
  let article = document.createElement("article");
  link.appendChild(article);

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
}}
//affichage de tous les produits
printKanaps();
