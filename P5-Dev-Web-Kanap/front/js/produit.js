/**
 * @typedef {Object}   ficheProduit
 * @property {Array}   colors  exemple": [ "Blue", "White", "Black"],
 * @property {String}   _id    exemple : "107fb5b75607497b96722bda5b504926",
 * @property {String}   name    exemple : "Kanap Sinopé",
 * @property {Number}   price    exemple : 1849,
 * @property {String}   imageUrl    exemple : "http://localhost:3000/images/kanap01.jpeg",
 * @property {String}   description    exemple : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 * @property {String}   altTxt    exemple : "Photo d'un canapé bleu, deux places"
 */


/**
 * Fonction qui permet de récupérer le paramètre id de l'adresse url de chaque produit
 *
 * @return  {String}  id du produit
 */
function getIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product_id = urlParams.get("id");
  return product_id;
};

async function getElementById() {

  const product = await getProductInfo(getIdFromUrl())
 
  document.querySelector("title").innerText = `${product.name}`
  document.querySelector(".item").innerHTML = `<article>
  <div class="item__img">
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  </div>
  <div class="item__content">

<div class="item__content__titlePrice">
<h1 id="title">${product.name}</h1>
      <p>Prix : <span id="price">${product.price}</span>€</p>
    </div>

    <div class="item__content__description">
      <p class="item__content__description__title">Description :</p>
      <p id="description">${product.description}</p>
    </div>

    <div class="item__content__settings">
      <div class="item__content__settings__color">
        <label for="color-select">Choisir une couleur :</label>
        <select name="color-select" id="colors">
            <option value="">--SVP, choisissez une couleur --</option>
            ${productColors(product.colors)}
        </select>
      </div>

      <div class="item__content__settings__quantity">
        <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
        <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
      </div>
    </div>

    <div class="item__content__addButton">
      <button id="addToCart">Ajouter au panier</button>
    </div>

  </div>
  </article>
` ;
// console.log(product.colors);


const colorChoice = document.getElementById('colors');    

const quantity = document.getElementById('quantity');    

const elt = document.getElementById('addToCart');
// On récupère l'élément sur lequel on veut détecter le clic
elt.addEventListener('click',  function() { 
  const couleur = colorChoice.value;
  const quantite = parseInt(quantity.value);
  addToCart({
    couleur,
    quantite,
    price : product.price,
    imageUrl : product.imageUrl,
    name : product.name,
    id:product._id
  })
 
  
});
}







getElementById();


function productColors(colors){
  let options = "";
  for (let color of colors) {
    options += `<option value="${color}">${color}</option>`
  }
  return options;
}
 
/***affichage du produit par id**/

// const couleur = product.find()
