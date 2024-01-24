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
    this.speed = 50;
    this.position = this.block.getBoundingClientRect();
    this.setListener();
  }

  setListener() {
    window.addEventListener("scroll", () => {
      if (this.position.y >= window.pageYOffset) {
        this.typeWriter();
      }
    });
  }

  typeWriter() {
    let i = 1;
    if (i === this.text.length) {
      this.block.innerHTML = this.text.substr(0, i);
      setTimeout(this.typeWriter, this.speed);
    }
    i++;
  }
}