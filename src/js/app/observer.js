document.addEventListener("DOMContentLoaded", () => {
  initHeaderObserver();
});

const initHeaderObserver = () => {
  const sections = document.querySelectorAll("[data-observ]");
  if (!sections) return;

  const navItems = document.querySelectorAll(".nav__link");

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const entryId = entry.target.getAttribute("id");
        navItems.forEach(temp => temp.classList.remove("active"));
        navItems.forEach((item) => {
          const itemId = item.getAttribute("data-id");
          if (itemId === entryId) {
            item.classList.add("active");
          }
        });
      }
    });
  };

  const options = {
    rootMargin: `-${window.innerHeight / 2}px 0px -${window.innerHeight / 2}px 0px`,
    threshold: 0
  };

  const observer = new IntersectionObserver(callback, options);

  sections.forEach((section) => observer.observe(section));
};
