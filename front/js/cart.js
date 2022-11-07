import { saveCart } from "./product.js"
export function getCart()

//récupère l'item "cart" du localStorage
saveCart(cart);
console.log(cart)
//ajout au panier du produit choisi 
var cart = localStorage.getItem("cart")