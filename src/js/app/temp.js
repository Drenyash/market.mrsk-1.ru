document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector("[data-burger]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const body = document.querySelector("body");
  const search = document.querySelector("[data-search]");
  const mobileSearch = document.querySelector("[data-mobile-search]");
  const services = document.querySelector("[data-services]");
  const mobileServices = document.querySelector("[data-mobile-services]");
  const servicesItems = document.querySelectorAll("[data-services-item]");
  const servicesContent = document.querySelector("[data-services-content]");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });

  search.addEventListener("click", () => {
    mobileSearch.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });

  services.addEventListener("click", () => {
    mobileServices.classList.toggle("active");
    servicesContent.classList.remove("active");
    body.classList.toggle("no-scroll");
  });

  servicesItems.forEach(el => {
    el.addEventListener("click", () => {
      servicesContent.classList.toggle("active");
    });
  });
});