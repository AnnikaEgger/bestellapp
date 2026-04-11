function basketItemTemplate(indexArray, indexObject) {
  return `<article class="dish-container">
    <div class="zoom-img-container">
        <img class="${items[indexArray][indexObject].class}" 
        src="${items[indexArray][indexObject].imageSource}" 
        alt="${items[indexArray][indexObject].imageAlt}" />
    </div>
    <div class="dish-container-left">
      <div class="dish-container-left-descr">
        <div class="dish-container-left-top">
          <h3>${items[indexArray][indexObject].name}</h3>
          <p class="dish-price">${items[indexArray][indexObject].price.toFixed(2).replace(".", ",") + "€"}</p>
        </div>
        <p class="dish-ingredients">${items[indexArray][indexObject].ingredients}</p>
      </div>
      <button id="${"btnAdd" + indexArray + indexObject}" onclick="addBasketItem(${indexArray}, ${indexObject})" class="add-to-basket-btn">Add to basket</button>
    </div>
  </article>`;
}

function basketItemSectionTemplate(index) {
  return `<div class="basket-item">
      <p class="basket-item-name">
      <span>${basketItems[index].amount}x</span>
      ${basketItems[index].name}</p>
      <div class="basket-item-bottom">
        <div class="basket-item-bottom-left">
        <button onclick="deleteBasketItem(${index})" class="delete-icon">
          <img
            src="./assets/icons/delete.svg"
            alt="Delete Icon"
          />
          </button class="add-one-btn">
          <button onclick="amountPlusOne(${index})">1+</button>
        </div>
        <p class="basket-item-price">
        ${basketItems[index].totalPrice.toFixed(2).replace(".", ",") + "€"}
        </p>
      </div>
    </div>`;
}

function basketTableTemplate(subtotal, deliveryFee, total) {
  return ` <table class="calc-table">
      <tr>
        <th>subtotal</th>
        <td>${subtotal.toFixed(2).replace(".", ",") + "€"}</td>
      </tr>
      <tr>
        <th>Delivery fee</th>
        <td>${deliveryFee.toFixed(2).replace(".", ",") + "€"}</td>
      </tr>
      <tr>
        <td></td>
      </tr>
      <tr>
        <th>Total</th>
        <td>${total.toFixed(2).replace(".", ",") + "€"}</td>
      </tr>
    </table>

    <button class="buy-now-btn">Buy now <span>(${total.toFixed(2).replace(".", ",") + "€"})</span></button>`;
}

function emptyBasketTemplate() {
  return `<h2>Your Basket</h2>
        <p>Nothing here yet. Go ahead and choose something delicious!</p>
        <img
          class="shopping-cart"
          src="./assets/icons/shopping_cart.svg"
          alt="Shopping Cart Icon"
        />`;
}

function fullBasketTemplate() {
  return `<h2>Your Basket</h2>
  <section id="basket-items-section" class="basket-items-section">
  </section>
  <section id="calc-price-section" class="calc-price-section">
   
  </section>`;
}
