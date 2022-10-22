//récupérer l'URL de la page produit
let productURL = window.location.href;
let urlParams = new URL (productURL);
let idParams = urlParams.searchParams.get("id");
console.log(idParams)

//récupérer l'id du produit cliqué dans l'API
async function fetchProduct(_id) {
  try {
  const res = await
  fetch("http://localhost:3000/api/products/")
  if (!res.ok) {
    throw new Error (`HTTP error : ${res.status}`);
  }
  const product = await res.json();
  return product;
  }
  catch (error) {
    console.error(`Une erreur est survenue !: ${error}`)
  }
  }
const promise = fetchProduct();
promise.then((product) => console.log(product[0]._id))

