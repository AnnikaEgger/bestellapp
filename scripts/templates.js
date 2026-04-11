function addItemTemplate(indexArray, indexObject) {
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
