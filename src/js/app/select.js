document.addEventListener("DOMContentLoaded", () => {
  const selectItems = document.querySelectorAll("[data-select]");
  selectItems.forEach((item) => {
    new Select(item);
  });
});

class Select {
  constructor(el) {
    this.select = el;
    this.btn = this.select.querySelector("[data-select-btn]");
    this.btnText = this.btn.querySelector("[data-select-btn-tmpl]");
    this.list = this.select.querySelector("[data-select-list]");
    this.items = this.list.querySelectorAll("li");
    this.input = this.select.querySelector("[data-select-input]");
    this.listeners();
  }

  listeners() {
    this.btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.list.classList.toggle("open");
      this.btn.classList.toggle("active");
    });

    this.items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.btnText.innerText = item.innerText;
        this.hideSelectsList();
      });
    });

    document.addEventListener("click", (e) => {
      if (!this.btn.contains(e.target) && !this.list.contains(e.target)) {
        this.hideSelectsList();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideSelectsList();
      }
    });
  }

  hideSelectsList() {
    this.list.classList.remove("open");
    this.btn.classList.remove("active");
  }
}