import axios from "axios";
import { Properties as item } from "svg-sprite-loader/examples/custom-runtime-generator/build/main";

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("[data-form-request]");

  if (!forms) return;

  forms.forEach((form) => {
    new FormRequest(form);
  });
});

class FormRequest {
  form;
  apiUrl;
  submitBtn;
  filesBlock;
  items;
  error;
  accept;
  files;
  filesUpload;

  constructor(form) {
    this.form = form;
    this.apiUrl = this.form.getAttribute("action");
    this.submitBtn = this.form.querySelector("button[type='submit']");
    this.filesBlock = this.form.querySelectorAll("[data-files]");
    this.items = [...this.form.querySelectorAll("input"), ...this.form.querySelectorAll("textarea")];
    this.accept = this.form.querySelector("[data-accept]");
    this.error = false;
    this.filesUpload = [];

    this.init();
  }

  init() {
    this.addFile();
    this.checkAcceptStatus();
    this.form.addEventListener("submit", (evt) => evt.preventDefault());
    this.submitBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.sendData();
    });
    this.accept.addEventListener("change", () => {
      this.checkAcceptStatus();
    });
  }

  checkAcceptStatus() {
    this.submitBtn.disabled = !!!this.accept.checked;
  }

  updateItems() {
    this.items = [...this.form.querySelectorAll("input"), ...this.form.querySelectorAll("textarea")];
  }

  addFile() {
    this.filesBlock.forEach((block) => {
      const fileAdd = block.querySelector("[data-file-add]");
      const fileAddName = fileAdd.getAttribute("data-file-add");

      fileAdd.addEventListener("change", (evt) => {
        this.files = evt.target.files;

        if (this.files) {
          fileAdd.setAttribute("hidden", "");
          let idx = 0;

          for (let file of this.files) {
            this.filesUpload = [...this.filesUpload, { name: fileAddName, value: file }];
            idx++;
            this.render(block, this.fileTemplate(file, fileAddName, idx));

            const fileElements = block.querySelectorAll("[data-file]");
            fileElements.forEach((fileElement) => {
              this.removeFile(fileElement, block, fileAdd);
            });
          }

          this.updateItems();
        }
      });
    });
  }

  removeFile(element, block, fileAdd) {
    const removeBtn = element.querySelector("[data-file-remove]");
    removeBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      element.remove();

      this.checkFileLength(block, fileAdd);
      this.updateItems();
    });
  }

  checkFileLength(block, fileAdd) {
    const elements = block.querySelectorAll("[data-file]");
    if (elements.length <= 0) {
      this.filesUpload = [];
      fileAdd.removeAttribute("hidden");
    }
  }

  getData() {
    const data = new FormData();

    this.items.forEach((item) => {
      if (item.type === "radio" || item.type === "checkbox") {
        if (item.checked) {
          data.append(item.name, item.value);
        }
      } else {
        data.append(item.name, item.value);
      }
    });

    data.append(this.filesUpload[0].name, this.filesUpload.map(el => el.value));

    return data;
  }

  sendData() {
    axios.post(this.apiUrl, this.getData())
      .then(response => response.data)
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error));
  }

  render(container, template, position = "beforeend") {
    return container.insertAdjacentHTML(position, template);
  }

  fileTemplate = (file) => {
    const text = file.name;

    return `
      <span class="form-request__file form-request__file--loaded" data-file>
        <span class="form-request__text form-request__text--file">
          <svg>
            <use xlink:href="./assets/sprite.svg#icon-doc-2"></use>
          </svg>
          <span>${text}</span>
          <svg class="form-request__remove" data-file-remove>
            <use xlink:href="./assets/sprite.svg#icon-close"></use>
          </svg>
        </span>
      </span>
    `;
  };
}
