//Mise en place d'une constante serveur à appeler à chaque opération
const server = "http://localhost:3000/api/products/";
// créaton de localData pour récupérer le localstrorage
let localData = JSON.parse(localStorage.getItem("cart"));
if (localData === null) localData = {};
//Fonction pour ajouter les produits
function addToCart(product){
    const key = product.id+"_"+product.couleur;
    if (localData[key] === undefined){
        localData[key] = product;
    }
    else {
        localData[key].quantite = parseInt(localData[key].quantite)+product.quantite;
    }
    
    console.log(key, localData)
    saveLocalStorage();
}
//Fonction qui enregistre le localstorage
function saveLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(localData));
}

async function getProductInfo(id){
    const reponse = await fetch(server + id);
    return await reponse.json();
}

function removeProduct(id){
console.log(id)
  delete localData[id];
  saveLocalStorage();
}




function getCart() {
    return localData;
}

/**
 * [changeQuantity description]
 *
 * @param   {[number]}  product   [product description]
 * @param   {[number]}  quantite  [quantite description]
 *
 * @return  {void}           met à jour le localStorage
 */
function changeQuantity(product, quantite) {
    if (quantite === 0) return removeProduct(product);
    localData[product].quantite = quantite;
    saveLocalStorage();
    
}
//Fonction qui permet de faire le total du prix de l'ensemble des produits
function getTotalPrice(){
    let newTotal = 0;
    let nbOfProducts = 0;
    for (const product of Object.values(localData)){
        product.quantite = parseInt(product.quantite);
        newTotal += product.price * product.quantite;
        nbOfProducts += product.quantite;
    }
    return {newTotal, nbOfProducts};
}





async function sendOrder( contact) {
    const cart = Object.keys(localData);

    const rawResponse = await fetch('https://localhost:3000/api/post', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contact, cart })
    });
    //si status 200 redirection 
}


// sendOrder()
