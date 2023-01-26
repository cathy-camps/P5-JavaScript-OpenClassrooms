//Récupérer l'id de commande d'un client 
const urlValue = window.location.search;
//Extraire l'id de commande de l'URL actuelle
const urlParams = new URLSearchParams(urlValue);
const numberOfCommand = urlParams.get("orderId");
document.getElementById("orderId").textContent = numberOfCommand + ' Merci pour votre commande';
