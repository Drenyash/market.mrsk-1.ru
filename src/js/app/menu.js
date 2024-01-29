document.addEventListener("DOMContentLoaded", () => {
  const servicesBtn = document.querySelector("[data-services]");
  const menu = document.querySelector("[data-mobile-services]");
  const servicesItems = document.querySelectorAll("[data-services-item]");
  const servicesContent = document.querySelector("[data-services-content]");
  const body = document.querySelector("body");
  let step = 0;
  let currentIndex = 0;
  const defaultIcon = document.getElementById("icon-step-0");
  const behindIcon = document.getElementById("icon-step-1");
  let currentWidth = window.screen.availWidth;

  const updateIcon = () => {
    if (step < 1) {
      defaultIcon.style.display = "flex";
      behindIcon.style.display = "none";
    } else {
      defaultIcon.style.display = "none";
      behindIcon.style.display = "flex";
    }
  };

  updateIcon();

  const showMenu = () => {
    step += 1;
    menu.classList.add("active");
    body.classList.add("no-scroll");
    servicesBtn.querySelector("span").textContent = "Назад";
    updateIcon();
  };

  const closeMenu = () => {
    step -= 1;
    menu.classList.remove("active");
    body.classList.remove("no-scroll");
    servicesBtn.querySelector("span").textContent = "Услуги";
    updateIcon();
  };

  const updateMenu = (step, idx) => {
    if (currentWidth < 1200) {
      currentIndex = idx;
      if (step === 0) {
        showMenu();
      } else if (step <= 1) {
        closeMenu();
      } else if (step > 2) {
        servicesContent.children[currentIndex].classList.add("active");
      } else {
        servicesContent.children[currentIndex].classList.remove("active");
      }
    }
  };

  servicesBtn.addEventListener("click", () => {
    if (step > 1) {
      step -= 1;
    }
    updateMenu(step, currentIndex);
  });

  servicesItems.forEach((item, idx) => {
    item.addEventListener("click", () => {
      if (servicesContent.children[idx]) {
        step === 1 ? step += 2 : step += 1;
      } else {
        step = 1;
      }
      updateMenu(step, idx);
    });
  });

  window.addEventListener("resize", () => {
    currentWidth = window.screen.availWidth;
  });

});
