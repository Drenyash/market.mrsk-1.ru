document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector("[data-burger]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const body = document.querySelector("body");
  const search = document.querySelector("[data-search]");
  const mobileSearch = document.querySelector("[data-mobile-search]");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });

  if (!search) return
  search.addEventListener("click", () => {
    mobileSearch.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });
});
