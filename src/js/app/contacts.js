document.addEventListener("DOMContentLoaded", () => {
  const activeElements = document.querySelectorAll(
    ".tabs-address__trigger.active"
  );
  if (!activeElements) return;
  activeElements.forEach((element) => {
    const container = element.parentNode;
    container.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  });
});