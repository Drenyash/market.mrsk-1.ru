document.addEventListener("DOMContentLoaded", () => {
  const textItems = document.querySelectorAll("[data-text-writing]");
  let longestEl = null;
  textItems.forEach((item) => {
    let itemCountLength = item.getAttribute("data-text-writing").length
    if (itemCountLength > longestEl) {
      longestEl = itemCountLength;
    }
  });
  textItems.forEach((item) => {
    new TextWriting(item, longestEl);
  });
});

class TextWriting {
  constructor(text, longestValue) {
    this.block = text;
    this.text = text.getAttribute("data-text-writing");
    this.speed = 500;
    this.position = this.block.getBoundingClientRect();
    this.iterator = 1;
    this.totalLength = longestValue;
    this.setListener();
  }

  setListener() {
    this.typeWriter();
  }

  typeWriter() {
    if (!this.text) return;
    setInterval(() => {
      if (this.iterator <= this.totalLength) {
        this.block.innerHTML = this.text.substr(0, this.iterator) + "<span class='line'>|</span>";
        this.iterator += 1;
      } else {
        this.iterator = 1;
      }
    }, this.speed);
    setInterval(() => {
      const line = this.block.querySelector("span");
      if (line) {
        line.classList.contains("animate") ? line.classList.remove("animate") : line.classList.add("animate");
      }
    }, 400);
  }
}
