function initPage() {
  document.querySelector("#order").addEventListener("click", validOrder);

  const localData = getCart();

  if (localData === null) {
    console.log("le panier est vide");


  } else {
    console.log("le panier n'est pas vide")
    // let total = 0;
    let html = "";
    let ref;
    for (const value of Object.values(localData)) {
      ref = value.id + "_" + value.couleur;
      // total += value.quantite * value.price;
      html += `    <article class="cart__item" data-id="${ref}">
      <div class="cart__item__img">
        <img src="${value.imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${value.name}</h2>
          <p>${value.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity"  name="itemQuantity" min="1" max="100" value="${value.quantite}" onchange="changeQty('${ref}', this.value)">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onclick="removeCartProduct('${ref}')">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
      document.querySelector("#cart__items").innerHTML = html;
      // updateResume();


    }
  }
}


window.onload = initPage;

function updateResume() {

  const { nbOfProducts, newTotal } = getTotalPrice();
  document.querySelector(".cart__price").innerHTML = `
              <p>Total (<span id="totalQuantity">
              ${nbOfProducts}
                </span> article${nbOfProducts <= 1 ? "" : "s"}) : <span id="totalPrice">
                  ${newTotal}
                </span> €</p>
            </div>`;
}

function removeCartProduct(id) {
  removeProduct(id);
  const target = document.querySelector(`article[data-id="${id}"]`);
  target.parentNode.removeChild(target);
  updateResume();
}

// window.onload = initPage;

function changeQty(id, qty) {
  changeQuantity(id, qty);
  updateResume();

}


function validOrder(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log("...", document.querySelector("#firstName").value);
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName:document.querySelector("#lastName").value,
    Address: document.querySelector("#address").value, 
    Ville:document.querySelector("#city").value, 
    Email:document.querySelector("#email").value
  }

  localStorage.setItem("contact", JSON.stringify(contact));
  sendOrder(contact, cart);


  console.log(contact);
}


