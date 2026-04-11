function renderItems() {
  let burgerSection = document.getElementById("article-section--burger");
  let pizzaSection = document.getElementById("article-section--pizza");
  let saladSection = document.getElementById("article-section--salad");

  for (let indexArray = 0; indexArray < items.length; indexArray++) {
    for (
      let indexObject = 0;
      indexObject < items[indexArray].length;
      indexObject++
    ) {
      if (indexArray == 0) {
        burgerSection.innerHTML += addItemTemplate(indexArray, indexObject);
      } else if (indexArray == 1) {
        pizzaSection.innerHTML += addItemTemplate(indexArray, indexObject);
      } else if (indexArray == 2) {
        saladSection.innerHTML += addItemTemplate(indexArray, indexObject);
      }
    }
  }
}

function renderBasket(indexArray, indexObject) {
  let basket = document.getElementById("order-basket");

  basket.classList.remove("order-basket--empty");
  basket.classList.add("order-basket--full");

  basket.innerHTML = `<h2>Your Basket</h2>
  <section id="basket-items-section" class="basket-items-section">
  </section>
  <section class="calc-price-section">
   
  </section>`;

  renderBasketItems();
}

function addBasketItem(indexArray, indexObject) {
  for (let index = 0; index < basketItems.length; index++) {
    if (basketItems[index].name == items[indexArray][indexObject].name) {
      elAlreadyExists = true;
      basketItems[index].amount += 1;
      basketItems[index].totalPrice =
        basketItems[index].singlePrice * basketItems[index].amount;
      renderBasket();
      return;
    } else {
      elAlreadyExists = false;
    }
  }
  if (basketItems.length == 0 || elAlreadyExists == false) {
    basketItems.push({
      "name": items[indexArray][indexObject].name,
      "singlePrice": items[indexArray][indexObject].price,
      "totalPrice": items[indexArray][indexObject].price,
      "amount": 1,
    });
    renderBasket();
  }
}

function renderBasketItems() {
  for (let index = 0; index < basketItems.length; index++) {
    const basketItemsSection = document.getElementById("basket-items-section");

    basketItemsSection.innerHTML += `<div class="basket-item">
      <p class="basket-item-name">
      <span>${basketItems[index].amount}x</span>
      ${basketItems[index].name}</p>
      <div class="basket-item-bottom">
        <div class="basket-item-bottom-left">
          <img
            class="delete-icon"
            src="./assets/icons/delete.svg"
            alt="Delete Icon"
          />
          <span>1+</span>
        </div>
        <p class="basket-item-price">
        ${basketItems[index].totalPrice.toFixed(2).replace(".", ",") + "€"}
        </p>
      </div>
    </div>`;
  }
}

function renderPrice() {
  let deliveryFee = 4.99;

  ` <table class="calc-table">
      <tr>
        <th>Subtotal</th>
        <td>36,70€</td>
      </tr>
      <tr>
        <th>Delivery fee</th>
        <td>${deliveryFee.replace(".", ",") + "€"}</td>
      </tr>
      <tr>
        <td></td>
      </tr>
      <tr>
        <th>Total</th>
        <td>41,69€</td>
      </tr>
    </table>

    <button class="buy-now-btn">Buy now <span>(14,69€)</span></button>`;
}
