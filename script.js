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
        burgerSection.innerHTML += itemArticleTemplate(indexArray, indexObject);
      } else if (indexArray == 1) {
        pizzaSection.innerHTML += itemArticleTemplate(indexArray, indexObject);
      } else if (indexArray == 2) {
        saladSection.innerHTML += itemArticleTemplate(indexArray, indexObject);
      }
    }
  }
}

function renderBasket() {
  let basket = document.getElementById("order-basket");

  basket.classList.remove("order-basket--empty");
  basket.classList.add("order-basket--full");

  basket.innerHTML = fullBasketTemplate();

  calcBasketItemPrice();
  renderBasketItems();
  calcBasketTablePrice();
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
  for (let index = 0; index < basketItems.length; index++) {
    if (basketItems[index].name == items[indexArray][indexObject].name) {
      elAlreadyExists = true;
      basketItems[index].amount += 1;

      // basketItems[index].totalPrice =
      //   basketItems[index].singlePrice * basketItems[index].amount;
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

    updateBtnAdd(indexArray, indexObject);
    renderBasket();
  }
}

function calcBasketItemPrice() {
  for (let index = 0; index < basketItems.length; index++) {
    basketItems[index].totalPrice =
      basketItems[index].singlePrice * basketItems[index].amount;
  }
}

function updateBtnAdd(indexArray, indexObject) {
  let btnAdd = document.getElementById("btnAdd" + indexArray + indexObject);

  btnAdd.style = "color: rgba(231, 108, 31, 1)";
  btnAdd.innerHTML = "Added" + basketItems[0].amount;
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

  if (basketItems.length > 0) {
    renderBasket();
  } else if (basketItems.length == 0) {
    let basket = document.getElementById("order-basket");

    basket.classList.remove("order-basket--full");
    basket.classList.add("order-basket--empty");

    basket.innerHTML = emptyBasketTemplate();
  }
}

function amountPlusOne(basketItemIndex) {
  basketItems[basketItemIndex].amount += 1;

  renderBasket();
}

function amountMinusOne(basketItemIndex) {
  if (basketItems[basketItemIndex].amount == 1) {
    deleteBasketItem(basketItemIndex);
    renderBasket();
  } else {
    basketItems[basketItemIndex].amount -= 1;
    renderBasket();
  }
}

// btn add to basket --> added (amount)
