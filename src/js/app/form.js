import axios from "axios";
import { Fancybox } from "@fancyapps/ui";

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("[data-form]");
  forms.forEach((form) => {
    new Form(form);
  });
});

class Form {
  constructor(el) {
    this.form = el;
    this.url = this.form.getAttribute("action");
    this.successMsg = document.querySelector("[data-form-success]");
    this.button = this.form.querySelector("[data-form-submit]");
    this.inputs = this.form.querySelectorAll("input");
    this.requiredInputs = this.form.querySelectorAll("[required]");
    this.agreement = this.form.querySelector("[data-form-agreement]");
    this.formValid = this.form.getAttribute("data-form-valid");
    this.validateInputs();
    this.submit();
  }

  validateInputs() {
    this.requiredInputs.forEach((el) => {
      const inputParent = el.closest("label");
      const errorMsg = inputParent.querySelector("span");

      el.addEventListener("blur", () => {
        if (el.type === "email") {
          const maskEmail = new RegExp(
            "^([A-Za-z0-9_-]+\\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*\\.[A-Za-z]{2,6}$"
          );
          if (maskEmail.test(el.value)) {
            el.setAttribute("data-valid", true);
            errorMsg.setAttribute("hidden", "hidden");
            errorMsg.innerText = "";
          } else {
            el.setAttribute("data-valid", false);
            errorMsg.removeAttribute("hidden");
            errorMsg.innerText = "Некорректный адрес почты";
            el.focus();
          }
        } else if (el.type === "tel") {
          if (el.value.length < 17) {
            el.setAttribute("data-valid", false);
            errorMsg.removeAttribute("hidden");
            this.form.setAttribute("data-form-valid", false);
            el.focus();
          } else {
            el.setAttribute("data-valid", true);
            errorMsg.setAttribute("hidden", "hidden");
            this.form.setAttribute("data-form-valid", true);
          }
        } else if (!el.value || el.value === el.placeholder) {
          console.log(el);
          el.setAttribute("data-valid", false);
          errorMsg.removeAttribute("hidden");
          this.form.setAttribute("data-form-valid", false);
          el.focus();
        } else {
          el.setAttribute("data-valid", true);
          errorMsg.setAttribute("hidden", "hidden");
          this.form.setAttribute("data-form-valid", true);
        }
      });
    });
  }

  checkAgreement() {
    this.agreement.addEventListener("change", () => {
      if (this.agreement.checked) {
        this.disableSubmit(false);
      } else {
        this.disableSubmit(true);
      }
    });
  }

  disableSubmit(state) {
    if (state) {
      this.button.setAttribute("disabled", "disabled");
    } else {
      this.button.removeAttribute("disabled");
      this.button.innerHTML = "Отправить";
    }
  }

  getData() {
    const data = new FormData();
    const dataParams = window.RSapp.modalForm;
    const els = [
      ...this.form.querySelectorAll("input"),
      ...this.form.querySelectorAll("textarea"),
      ...this.form.querySelectorAll("select"),
    ];

    els.forEach((item) => {
      if (item.type === "file") {
        data.append(item.name, item.files[0]);
      } else if (item.type === "radio" || item.type === "checkbox") {
        if (item.checked) {
          data.append(item.name, "Y");
        } else if (!item.checked) {
          data.append(item.name, "N");
        }
      } else {
        data.append(item.name, item.value);
      }
    });
    if (dataParams) {
      for (const [name, value] of dataParams) {
        data.append(name, value);
      }
    }
    return data;
  }

  submit() {
    this.checkAgreement();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.formValid) {
        axios
          .post(this.url, this.getData())
          .then((response) => {
            this.showSuccess();
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setTimeout(() => {
              this.form.reset();
              Fancybox.close();
            }, 2000);
          });
      } else {
        this.disableSubmit(true);

      }
    });
  }

  showSuccess() {
    new Fancybox([
      {
        src: this.successMsg.id,
        type: "inline",
        closeButton: false
      }
    ]);
  }
}
