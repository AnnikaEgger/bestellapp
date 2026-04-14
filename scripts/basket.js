function renderBasket() {
  let basketWrapper = document.getElementById("basket-wrapper");
  let basket = document.getElementById("order-basket");

  // basketWrapper.classList.remove("basket-wrapper-resp-closed");

  if (basket == null) {
    if (basketItems.length == 0) {
      basketWrapper.innerHTML = emptyBasketTemplate();

      let basket = document.getElementById("order-basket");
      basket.classList.remove("order-basket--full");
      basket.classList.add("order-basket--empty");
    }
    // } else if (basketItems.length > 0) {
    //   basketWrapper.innerHTML = fullBasketTemplate();

    //   let basket = document.getElementById("order-basket");
    //   basket.classList.remove("order-basket--empty");

    //   basket.classList.add("order-basket--full");

    //   calcBasketItemPrice();
    //   renderBasketItems();
    //   calcBasketTablePrice();
    // }
  } else if (basket.open == true) {
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

    basket.showModal();
  } else {
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
  }

  // let basket = document.getElementById("order-basket");

  // if (window.innerWidth > 768 || basket.open == true) {
  //   basket.classList.add("order-basket-open");
  // }

  // openBasket();
}

function addClassBasketOpen() {
  let basket = document.getElementById("order-basket");

  if (window.innerWidth > 768 || basket.open == true) {
    basket.classList.add("order-basket-open");
  }
}

// function openBasket() {
//   let basket = document.getElementById("order-basket");

//   if (window.innerWidth > 768) {
//     basket.classList.remove("order-basket-closed");
//   }
// }

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
  addClassBasketOpen();
  // openBasket();
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

  renderBasket();
  updateBtnAdd();
  addClassBasketOpen();
}

function amountPlusOne(basketItemIndex) {
  basketItems[basketItemIndex].amount += 1;
  updateBtnAdd();
  renderBasket();
  addClassBasketOpen();
}

function amountMinusOne(basketItemIndex) {
  if (basketItems[basketItemIndex].amount == 1) {
    deleteBasketItem(basketItemIndex);
    renderBasket();
  } else {
    basketItems[basketItemIndex].amount -= 1;
    updateBtnAdd();
    renderBasket();
    addClassBasketOpen();
  }
}

function openBasketViaRespMenu() {
  let basket = document.getElementById("order-basket");
  // basket.classList.add("order-basket-open");
  basket.showModal();

  addClassBasketOpen();
  renderBasket();
}

// function closeBasket() {
//   let basket = document.getElementById("order-basket");
//   basket.close();
//   basket.classList.add("order-basket-closed");
// }
