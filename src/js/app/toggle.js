document.addEventListener("DOMContentLoaded", () => {
  const toggleEls = document.querySelectorAll("[data-toggle]");

  toggleEls.forEach((el) => {
    el.addEventListener("click", (evt) => {
      if (evt.target.parentNode !== el) return;
      el.classList.toggle("active");
    });
  });

});