document.addEventListener("DOMContentLoaded", () => {
  updateCatalog();
});

export const updateCatalog = () => {
  const catalog = document.querySelector(".catalog");
  if (!catalog) return;
  let currentWidth = window.screen.availWidth;
  let products = null;
  products = document.querySelectorAll(".catalog__wrapper .product-card");
  const modalRent = document.getElementById("modalRent");

  products.forEach((product, idx) => {
    const showBtn = product.querySelector(".product-card__button");
    const modal = product.querySelector(".product-card__modal");
    const modalButton = modal.querySelector("[data-fancybox]");
    const productList = modal.querySelector(".product-card__list");
    const productTitle = modal.querySelector(".product-card__title");
    const productImage = modal.querySelector(".product-card__picture img");

    showBtn.addEventListener("click", (evt) => {
      if (currentWidth > 1200) {
        evt.preventDefault();

        products.forEach((el, elIdx) => {
          if (idx !== elIdx) {
            el.classList.toggle("product-card--disabled");
          }
        });
        if (showBtn.textContent === "Скрыть") {
          showBtn.textContent = "Подробнее";
        } else {
          showBtn.textContent = "Скрыть";
        }
        modal.classList.toggle("active");
        if (modal.getBoundingClientRect().x > catalog.getBoundingClientRect().width) {
          modal.style.left = "initial";
          modal.style.right = "0";
        } else if (modal.getBoundingClientRect().bottom > catalog.getBoundingClientRect().bottom) {
          modal.style.top = "50%";
        }
      }
    });

    modalButton.addEventListener("click", () => {
      const id = modalButton.getAttribute("data-product-id");
      let modalList = modalRent.querySelector(".product-card__list");
      const modalTitle = modalRent.querySelector(".product-card__title");
      const modalImage = modalRent.querySelector(".product-card__picture img");
      const modalId = modalRent.querySelector("input[name='PRODUCT_ID']");
      modalList.replaceWith(productList.cloneNode(true));
      modalTitle.textContent = productTitle.textContent;
      modalImage.src = productImage.src;
      modalId.value = id;
    });

    window.addEventListener("click", (evt) => {
      if (modal.classList.contains("active")) {
        if (!product.contains(evt.target)) {
          products.forEach((el, elIdx) => {
            if (idx !== elIdx) {
              el.classList.remove("product-card--disabled");
            }
          });
          modal.classList.remove("active");
          if (showBtn.textContent === "Скрыть") {
            showBtn.textContent = "Подробнее";
          } else {
            showBtn.textContent = "Скрыть";
          }
        }
      }
    });
  });

  window.addEventListener("resize", () => {
    currentWidth = window.screen.availWidth;
  });
};
