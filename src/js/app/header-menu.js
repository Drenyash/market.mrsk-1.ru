document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("[data-header-menu-block]");
  new Menu(menu);
});

class Menu {
  constructor(item) {
    this.menuBlock = item;
    this.button = this.menuBlock.querySelector("[data-header-menu-btn]");
    this.menu = this.menuBlock.querySelector("[data-header-menu]");
    this.setListeners();
  }

  setListeners() {
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.menu.classList.toggle("active");
      this.button.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!this.menuBlock.contains(e.target) && this.menu.classList.contains("active")) {
        this.menu.classList.remove("active");
        this.button.classList.remove("active");
      }
    });
  }
}
