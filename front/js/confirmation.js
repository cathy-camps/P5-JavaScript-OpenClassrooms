const urlValue = window.location.search;
const urlParams = new URLSearchParams(urlValue);
const numberOfCommand = urlParams.get("orderId");
document.getElementById("orderId").textContent = numberOfCommand;
