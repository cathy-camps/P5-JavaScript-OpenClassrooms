//jshint esversion: 8, asi: true
const items = document.getElementById('items');

//requête de l'API, récupérer les données
async function getProducts() {
  return await fetch(`http://localhost:3000/api/products/`)
    .then((res) => res.json())
    .then((productList) => {
      let products = productList
      console.log(products);
      return products;
    })
    .catch((error) => {
      window.alert("Une erreur est survenue !");
    });
  }

//création des éléments et affichage des données de l'API
  async function printKanaps() {
  await getProducts().then((products)=> {
    const productList = products;
    console.log(typeof(productList));
      for (const product of productList) { 
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
        h3.textContent = product.name;

        //insertion balise <p>
        let p = document.createElement("p");
        article.appendChild(p);
        p.classList.add("productDescription");
        p.textContent = product.description;
  }
});
    }
  
//affichage de tous les produits
console.log("hello")
printKanaps();
