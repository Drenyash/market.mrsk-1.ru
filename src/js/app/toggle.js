document.addEventListener("DOMContentLoaded", () => {
  const toggleEls = document.querySelectorAll("[data-toggle]");

  toggleEls.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active");
    });
  });

});