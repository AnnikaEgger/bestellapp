function renderBasket() {
  let basketWrapper = document.getElementById("basket-wrapper");

  if (basketItems.length == 0) {
    basketWrapper.innerHTML = emptyBasketTemplate();

    let basket = document.getElementById("order-basket");
    basket.classList.remove("order-basket--full", "order-basket-closed");
    basket.classList.add("order-basket--empty");
  } else {
    basketWrapper.innerHTML = fullBasketTemplate();

    let basket = document.getElementById("order-basket");
    basket.classList.remove("order-basket--empty", "order-basket-closed");
    basket.classList.add("order-basket--full");

    calcBasketItemPrice();
    renderBasketItems();
    calcBasketTablePrice();
  }
}

function renderBasketItems() {
  for (let index = 0; index < basketItems.length; index++) {
    const BASKET_ITEMS_SECTION = document.getElementById(
      "basket-items-section",
    );
    if (basketItems[index].amount > 1) {
      BASKET_ITEMS_SECTION.innerHTML += basketItemSecondTemplate(index);
    } else {
      BASKET_ITEMS_SECTION.innerHTML += basketItemTemplate(index);
    }
  }
}

function addBasketItem(indexArray, indexObject) {
  let elAlreadyExists = false;

  for (let index = 0; index < basketItems.length; index++) {
    if (basketItems[index].name == items[indexArray][indexObject].name) {
      elAlreadyExists = true;
      basketItems[index].amount += 1;
      break;
    }
  }

  if (basketItems.length == 0 || elAlreadyExists == false) {
    basketItems.push(
      JSON.parse(basketItemObjectTemplate(indexArray, indexObject)),
    );
  }

  updateBtnAdd();
  renderBasket();
}

function calcBasketItemPrice() {
  for (let index = 0; index < basketItems.length; index++) {
    basketItems[index].totalPrice =
      basketItems[index].singlePrice * basketItems[index].amount;
  }
}

function calcBasketTablePrice() {
  let subtotal = 0;
  let deliveryFee = 4.99;
  let total = 0;

  for (let index = 0; index < basketItems.length; index++) {
    subtotal += basketItems[index].totalPrice;
  }

  total = subtotal + deliveryFee;

  const CALC_PRICE_SECTION = document.getElementById("calc-price-section");
  CALC_PRICE_SECTION.innerHTML = basketTableTemplate(
    subtotal,
    deliveryFee,
    total,
  );
}

function deleteBasketItem(basketItemsIndex) {
  basketItems.splice(basketItemsIndex, 1);

  // if (basketItems.length > 0) {
  //   renderBasket();
  // } else if (basketItems.length == 0) {
  //   // let basket = document.getElementById("order-basket");

  //   // basket.classList.remove("order-basket--full");
  //   // basket.classList.add("order-basket--empty");
  //   // basket.innerHTML = emptyBasketTemplate();

  //   renderBasket();
  // }
  renderBasket();
  updateBtnAdd();
}

function amountPlusOne(basketItemIndex) {
  basketItems[basketItemIndex].amount += 1;
  updateBtnAdd();
  renderBasket();
}

function amountMinusOne(basketItemIndex) {
  if (basketItems[basketItemIndex].amount == 1) {
    deleteBasketItem(basketItemIndex);
    renderBasket();
  } else {
    basketItems[basketItemIndex].amount -= 1;
    updateBtnAdd();
    renderBasket();
  }
}
