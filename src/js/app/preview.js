import { CountUp } from "countup.js";

document.addEventListener("DOMContentLoaded", () => {
  new Preview();
});

class Preview {
  constructor() {
    this.preview = document.querySelector(".preview");
    if (!this.preview) return;
    this.previewHeight = this.preview.getBoundingClientRect().height;
    this.mainPreview = this.preview.querySelector(".preview__item--main");
    this.controlElements = this.mainPreview.querySelectorAll("[data-tab]");
    this.items = this.preview.querySelectorAll("[data-content]");
    this.slider = this.preview.querySelector(".preview__slider");
    this.init();
  }

  init() {
    this.controlElements.forEach((element) => {
      element.addEventListener("click", (evt) => {
        const previewHeight = this.preview.getBoundingClientRect().height;
        const elementId = element.dataset.tab;
        const currentElement = Array.from(this.items).filter(el => {
          return el.getAttribute("data-content") === elementId ? el.getAttribute("data-content") : null;
        });
        const elementHeight = currentElement[0].getBoundingClientRect().height;

        if (elementHeight > previewHeight) {
          this.preview.style.height = `${elementHeight}px`;
        }

        this.items.forEach((item) => {

          const itemId = item.dataset.content;
          item.classList.remove("active");

          if (itemId === elementId) {
            item.classList.add("active");
            this.animateFeatures(item);
          }

          this.returnToFirstSection(item);
        });
      });
    });

    this.animateElements();
    this.animateNums();
  }

  returnToFirstSection(element) {
    const backElement = element.querySelector(".preview__back");

    if (!backElement) return;

    backElement.addEventListener("click", () => {
      this.preview.style.height = `${this.previewHeight}px`;

      this.items.forEach((item) => {
        item.classList.remove("active");
      });
    });
  }

  animateElements() {
    let counter = 0;
    setInterval(() => {
      this.controlElements.forEach((temp) => temp.classList.remove("active"));

      if (counter >= 7) {
        counter = 0;
      } else {
        counter++;
      }
      this.controlElements[counter].classList.add("active");
    }, 3000);
  }

  animateNums() {
    const divs = document.querySelectorAll("[data-num]");

    divs.forEach(function(div) {
      const num = parseInt(div.getAttribute("data-num"), 10);
      const spanEl = div.querySelector("span");

      let anim = new CountUp(spanEl, num, { separator: " " });
      if (!anim.error) {
        anim.start();
      } else {
        console.error(anim.error);
      }
    });
  }

  animateFeatures = (container) => {
    const elements = container.querySelectorAll(".preview__element");
    const showBtn = container.querySelector("[data-content-show-btn]");
    let interval = null;
    let idx = 0;

    showBtn.addEventListener("click", () => {
      elements[0].classList.add("active");

      setInterval(() => {
        idx++;
        if (elements[idx]) {
          elements[idx].classList.add("active");
        }
      }, 2000);

      if (elements.length === idx) {
        clearInterval(interval);
      }
    });
  };
}
