function init() {
  renderItems();
  renderBasket();
}

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

function updateBtnAdd() {
  for (let indexArray = 0; indexArray < items.length; indexArray++) {
    for (
      let indexObject = 0;
      indexObject < items[indexArray].length;
      indexObject++
    ) {
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
  }
}

function submitOrder() {
  let confirmationDialog = document.getElementById("confirmation-dialog");
  let basket = document.getElementById("order-basket");

  basketItems = [];
  updateBtnAdd();
  confirmationDialog.showModal();

  basket.classList.remove("order-basket-open");
  basket.close();

  confirmationDialog.classList.add("confirmation-dialog-closed");
  setTimeout(closeDialog, 6000);
}

function closeDialog() {
  let confirmationDialog = document.getElementById("confirmation-dialog");

  confirmationDialog.classList.remove("confirmation-dialog-closed");
  confirmationDialog.close();
}
