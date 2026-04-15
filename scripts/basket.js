// rendering basket
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
  }
  openOrCloseBasket(openBasketDialog);
  updateMenuItemsCounter();
}

// opening or closing basket dialog + adding or removing class "order-basket-open"
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

// rendering basket item
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

// adding new item to basket or increasing amount if it already exists
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

  updateBtnAddLoops();
  renderBasket();
}

// calculating total price of a basket item
function calcBasketItemPrice() {
  for (let index = 0; index < basketItems.length; index++) {
    basketItems[index].totalPrice =
      basketItems[index].singlePrice * basketItems[index].amount;
  }
}

// calculating subtotal, delivery fee, total
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

// deleting item from basketItems Array
function deleteBasketItem(basketItemsIndex) {
  basketItems.splice(basketItemsIndex, 1);

  updateBtnAddLoops();
  renderBasket(checkIfBasketDialogOpen());
}

// increasing amount of item by 1
function amountPlusOne(basketItemIndex) {
  basketItems[basketItemIndex].amount += 1;

  updateBtnAddLoops();
  renderBasket(checkIfBasketDialogOpen());
}

// decreasing amount of item by 1, deleting it if amount = 0
function amountMinusOne(basketItemIndex) {
  if (basketItems[basketItemIndex].amount == 1) {
    deleteBasketItem(basketItemIndex);
  } else {
    basketItems[basketItemIndex].amount -= 1;
    updateBtnAddLoops();
    renderBasket(checkIfBasketDialogOpen());
  }
}

// creating a variable to check if dialog is already opened
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

// creating a variable to decide whether dialog should be rendered opened or closed
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
