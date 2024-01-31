document.addEventListener("DOMContentLoaded", () => {
  const textItems = document.querySelectorAll("[data-text-writing]");
  textItems.forEach((item) => {
    new TextWriting(item);
  });
});

class TextWriting {
  constructor(text) {
    this.block = text;
    this.text = text.getAttribute("data-text-writing");
    this.speed = 1000;
    this.position = this.block.getBoundingClientRect();
    this.iterator = 1;
    this.interval = null;

    this.setListener();
  }

  setListener() {
    this.typeWriter();
  }

  typeWriter() {
    if (this.text) {
      setInterval(() => {
        if (this.iterator <= this.text.length) {
          this.block.innerHTML = this.text.substr(0, this.iterator) + "<span class='line'>|</span>";
          this.iterator += 1;
        } else {
          this.iterator = 1;
        }
      }, this.speed);
      setInterval(() => {
        let line = this.block.querySelector("span");
        if (line) {
          line.classList.contains('animate') ? line.classList.remove('animate') : line.classList.add('animate');
        }
      }, 400);
    }
  }
}
