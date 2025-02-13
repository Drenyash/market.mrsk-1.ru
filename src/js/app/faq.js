document.addEventListener("DOMContentLoaded", () => {
  initFaq();
});

const initFaq = () => {
  const faq = document.querySelector(".faq");

  if (!faq) return;

  const faqItems = faq.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq__header");

    header.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
};
