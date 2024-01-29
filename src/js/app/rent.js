document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.querySelector(".catalog");
  if (!catalog) return;
  const products = document.querySelectorAll(".catalog__wrapper .product-card");
  let currentWidth = window.screen.availWidth;

  products.forEach((product, idx) => {
    const showBtn = product.querySelector(".product-card__button");
    const modal = product.querySelector(".product-card__modal");

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

    window.addEventListener("click", (evt) => {
      if (modal.classList.contains('active')) {
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
});
