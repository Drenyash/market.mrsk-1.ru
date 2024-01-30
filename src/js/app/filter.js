import { updateCatalog } from "./rent";

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("[data-filter]");

  forms.forEach(filter => {
    const resetButton = filter.querySelector(".button");
    let totalCheckedEls = [];
    const els = [
      ...filter.querySelectorAll("input")
    ];

    els.forEach(el => {
      el.addEventListener("change", () => {
        totalCheckedEls = els.filter(element => {
          return !!element.checked;
        });
        if (totalCheckedEls.length >= 1) {
          resetButton.classList.remove("button--disabled");
        } else {
          resetButton.classList.add("button--disabled");
        }
        updateCatalog()
      });
    });

    resetButton.addEventListener("click", () => {
      if (!resetButton.classList.contains("button--disabled")) {
        resetButton.classList.add("button--disabled");
      }
    });
  });
});
