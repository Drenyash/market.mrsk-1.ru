document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-tabs-container]");
  tabs.forEach((item) => new Tabs(item));
});

class Tabs {
  constructor(item) {
    this.item = item;
    this.identificator = this.item.getAttribute("data-tabs-container");
    this.trigger = item.querySelectorAll(`[data-tabs-trigger=${this.identificator}]`);
    this.content = item.querySelectorAll(`[data-tabs-list=${this.identificator}]`);
    this.setListeners();
  }

  setListeners() {
    this.setActiveTab();
  }

  setActiveTab() {
    this.trigger.forEach((currentBtn) => {
      currentBtn.addEventListener("click", () => {
        const prevBtn = this.item.querySelectorAll(`[data-tabs-trigger=${this.identificator}]`);
        const prevContent = this.item.querySelectorAll(`[data-tabs-list=${this.identificator}]`);
        prevBtn.forEach((btn) => {
          btn.classList.remove("active");
        });
        prevContent.forEach((content) => {
          content.classList.remove("active");
        });
        const tabId = currentBtn.getAttribute("data-tabs");
        const currentTab = document.getElementById(tabId);
        currentBtn.classList.add("active");
        currentTab.classList.add("active");
      });
    });
  }
};