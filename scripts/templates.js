function itemArticleTemplate(indexArray, indexObject) {
  return `<article class="dish-container">
    <div class="zoom-img-container">
        <img class="${items[indexArray][indexObject].class}" 
        src="${items[indexArray][indexObject].imageSource}" 
        alt="${items[indexArray][indexObject].imageAlt}" />
    </div>
    <div class="dish-container-left">
      <div class="dish-container-left-left">
          <h3>${items[indexArray][indexObject].name}</h3>
        <p class="dish-ingredients">${items[indexArray][indexObject].ingredients}</p>
      </div>

      <div class="dish-container-left-right">
        <p class="dish-price">${items[indexArray][indexObject].price.toFixed(2).replace(".", ",") + "€"}</p>
        <button id="${"btnAdd" + indexArray + indexObject}" 
        onclick="addBasketItem(${indexArray}, ${indexObject})" 
        class="add-to-basket-btn">Add to basket</button>
      </div>
    </div>
  </article>`;
}

function basketItemTemplate(index) {
  return `<div class="basket-item">
      <p class="basket-item-name">
      <span>${basketItems[index].amount}x</span>
      ${basketItems[index].name}</p>
      <div class="basket-item-bottom">
        <div class="basket-item-bottom-left">
           <button onclick="deleteBasketItem(${index})" class="delete-icon">
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z"
              />
            </svg>
          </button>
          <span>${basketItems[index].amount}</span>
          <button class="amount-btn" onclick="amountPlusOne(${index})">+</button>
        </div>
        <p class="basket-item-price">
        ${basketItems[index].totalPrice.toFixed(2).replace(".", ",") + "€"}
        </p>
      </div>
    </div>`;
}

// Template for changing position of delete button
function basketItemSecondTemplate(index) {
  return `<div class="basket-item">
    <div class="name-dlt-btn-wrapper">
      <p class="basket-item-name">
      <span>${basketItems[index].amount}x</span>
      ${basketItems[index].name}</p>
         <button onclick="deleteBasketItem(${index})" class="delete-icon">
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z"
            />
          </svg>
        </button>
    </div>

      <div class="basket-item-bottom">
        <div class="basket-item-bottom-left">
          <button class="amount-btn" onclick="amountMinusOne(${index})">-</button>
          <span>${basketItems[index].amount}</span>
          <button class="amount-btn" onclick="amountPlusOne(${index})">+</button>
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

    <button onclick="submitOrder()" class="buy-now-btn">Buy now <span>(${total.toFixed(2).replace(".", ",") + "€"})</span></button>`;
}

function emptyBasketTemplate() {
  return ` <dialog id="order-basket" class="order-basket">
  <button onclick="toggleOpenBasketDialog()" id="close-basket-btn" class="close-basket-btn">
      <img src="./assets/icons/close.svg" alt="Close Icon">
    </button>
    <h2>Your Basket</h2>
        <p>Nothing here yet. Go ahead and choose something delicious!</p>
        <img
          class="shopping-cart"
          src="./assets/icons/shopping_cart.svg"
          alt="Shopping Cart Icon"
        />
    </dialog>`;
}

function fullBasketTemplate() {
  return `<dialog id="order-basket" class="order-basket">
  <button onclick="toggleOpenBasketDialog()" id="close-basket-btn" class="close-basket-btn">
      <img src="./assets/icons/close.svg" alt="Close Icon">
    </button>
    <h2>Your Basket</h2>
    <div class="basket-items-section-wrapper">
      <section id="basket-items-section" class="basket-items-section">
      </section>
    </div>
    <section id="calc-price-section" class="calc-price-section">
    </section>
  </dialog>`;
}

function basketItemObjectTemplate(indexArray, indexObject) {
  return `{"name": "${items[indexArray][indexObject].name}",
      "singlePrice": ${items[indexArray][indexObject].price},
      "totalPrice": ${items[indexArray][indexObject].price},
      "amount": 1}`;
}
