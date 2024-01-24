import { Fancybox } from "@fancyapps/ui";
document.addEventListener("DOMContentLoaded", () => {
  Fancybox.bind("[data-fancybox]", {
    closeButton: false,
    dragToClose: false,
    wheel: false,
    autoFocus: true,
  });
})