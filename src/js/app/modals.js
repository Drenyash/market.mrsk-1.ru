import { Fancybox } from "@fancyapps/ui";

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-modal-next]");
  const modalJur = document.getElementById("modalTechConnectionJUR");
  const modalFiz = document.getElementById("modalTechConnectionFIZ");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentModal = Fancybox.getInstance();
      const newModalId = button.getAttribute("data-modal-next");

      currentModal.close();

      new Fancybox([
        {
          src: newModalId,
          type: "inline",
          closeButton: false
        }
      ]);
      const modalParams = document.getElementById("modalTechConnectionParams");
      const inputsParams = modalParams.querySelectorAll("input");

      const buttonNextStep = modalParams.querySelector("[data-modal-order]");
      buttonNextStep.addEventListener("click", (e) => {
        e.preventDefault();
        const checkedInputs = Array.from(inputsParams).filter((el) => {
          return el.checked;
        });
        const modalForm = new FormData();
        checkedInputs.forEach((input) => {
          window.localStorage.setItem(input.name, input.value);
          modalForm.append(input.name, input.value);
        });
        window.RSapp.modalForm = modalForm;
        const modalParamsCurrent = Fancybox.getInstance();
        const statusInput = checkedInputs.filter((input) => {
          return input.name === "status";
        });
        if (statusInput[0].value === "jur") {
          modalParamsCurrent.close();
          new Fancybox([
            {
              src: modalJur,
              type: "inline",
              closeButton: false,
              autofocus: true,
            }
          ]);
        } else {
          modalParamsCurrent.close();
          new Fancybox([
            {
              src: modalFiz,
              type: "inline",
              closeButton: false,
              autofocus: true,
            }
          ]);
        }
      });
    });
  });


  const buttonBack = document.querySelectorAll("[data-modal-back]");
  buttonBack.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const curModal = Fancybox.getInstance();
      const modalToGo = document.getElementById("modalTechConnectionParams");
      curModal.close();
      new Fancybox([
        {
          src: modalToGo,
          type: "inline",
          closeButton: false,
          autofocus: true,
        }
      ]);
    });
  });
});