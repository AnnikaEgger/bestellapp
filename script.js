// initial function after html body is loaded
function init() {
  renderItems();
  renderBasket();
  updateMenuItemsCounter();
}

// rendering food items for each section (burger, pizza, salad)
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

// For Loops for updateBtnAdd()
function updateBtnAddLoops() {
  for (let indexArray = 0; indexArray < items.length; indexArray++) {
    for (
      let indexObject = 0;
      indexObject < items[indexArray].length;
      indexObject++
    ) {
      updateBtnAdd(indexArray, indexObject);
    }
  }
}

// updating Text and Color for "Add to Basket"-Button
function updateBtnAdd(indexArray, indexObject) {
  let btnAdd = document.getElementById("btnAdd" + indexArray + indexObject);

  for (let index = 0; index < basketItems.length; index++) {
    if (items[indexArray][indexObject].name == basketItems[index].name) {
      btnAdd.style = "color: rgba(231, 108, 31, 1)";
      btnAdd.innerHTML = "Added " + basketItems[index].amount;
      break;
    } else {
      btnAdd.innerHTML = "Add to Basket";
      btnAdd.style = "color: ''";
    }
  }

  if (basketItems.length == 0) {
    btnAdd.innerHTML = "Add to Basket";
    btnAdd.style = "color: ''";
  }
}

// clearing basket items, displaying confirmation dialog after submitting Order
function submitOrder() {
  let confirmationDialog = document.getElementById("confirmation-dialog");
  let basket = document.getElementById("order-basket");

  basketItems = [];
  updateBtnAddLoops();
  confirmationDialog.showModal();

  basket.classList.remove("order-basket-open");
  basket.close();

  confirmationDialog.classList.add("confirmation-dialog-closed");
  setTimeout(closeConfirmationDialog, 6000);
}

// closing confirmation dialog
function closeConfirmationDialog() {
  let confirmationDialog = document.getElementById("confirmation-dialog");

  confirmationDialog.classList.remove("confirmation-dialog-closed");
  confirmationDialog.close();
}

// updating displayed number of basket items in menu bar
function updateMenuItemsCounter() {
  let menubarItemsCounter = document.getElementById("menubar-items-counter");

  menubarItemsCounter.innerText = basketItems.length;
}
