function renderBasket(openBasketDialog) {
  let basketWrapper = document.getElementById("basket-wrapper");

  if (basketItems.length == 0) {
    basketWrapper.innerHTML = emptyBasketTemplate();

    let basket = document.getElementById("order-basket");
    basket.classList.remove("order-basket--full");
    basket.classList.add("order-basket--empty");
  } else if (basketItems.length > 0) {
    basketWrapper.innerHTML = fullBasketTemplate();

    let basket = document.getElementById("order-basket");
    basket.classList.remove("order-basket--empty");
    basket.classList.add("order-basket--full");

    calcBasketItemPrice();
    renderBasketItems();
    calcBasketTablePrice();
    openOrCloseBasket(openBasketDialog);
  }
}

function openOrCloseBasket(openBasketDialog) {
  let basket = document.getElementById("order-basket");

  if (openBasketDialog == true) {
    basket.showModal();
  } else if (openBasketDialog == false) {
    basket.close();
  }

  if (window.innerWidth > 768 || basket.open == true) {
    basket.classList.add("order-basket-open");
  } else if (basket.open == false) {
    basket.classList.remove("order-basket-open");
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

  updateBtnAdd();
  renderBasket(checkIfBasketDialogOpen());
}

function amountPlusOne(basketItemIndex) {
  basketItems[basketItemIndex].amount += 1;

  updateBtnAdd();
  renderBasket(checkIfBasketDialogOpen());
}

function amountMinusOne(basketItemIndex) {
  if (basketItems[basketItemIndex].amount == 1) {
    deleteBasketItem(basketItemIndex);
  } else {
    basketItems[basketItemIndex].amount -= 1;
    updateBtnAdd();
    renderBasket(checkIfBasketDialogOpen());
  }
}

function checkIfBasketDialogOpen() {
  let basket = document.getElementById("order-basket");
  let openBasketDialog;

  if (basket.open == true) {
    openBasketDialog = true;
  } else {
    openBasketDialog = false;
  }

  return openBasketDialog;
}

function toggleOpenBasketDialog() {
  let openBasketDialog;
  let basket = document.getElementById("order-basket");

  if (basket.open == false) {
    openBasketDialog = true;
  } else if (basket.open == true) {
    openBasketDialog = false;
  }

  renderBasket(openBasketDialog);
}
