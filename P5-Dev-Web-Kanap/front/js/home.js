async function getAllProducts(){
    const reponse = await fetch("http://localhost:3000/api/products/");
    const productsList = await reponse.json();
    let html = "";
    productsList.forEach(produit => {
        html += `<a href="./product.html?id=${produit._id}">
        <article>
          <img src="${produit.imageUrl}" alt="${produit.altTxt}">
          <h3 class="productName">${produit.name}</h3>
          <p class="productDescription">${produit.description}</p>
        </article>
      </a>`
    });
    console.log("...", html)
    document.querySelector("#items").innerHTML = html;
}

getAllProducts();