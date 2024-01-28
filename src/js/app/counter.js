document.addEventListener("DOMContentLoaded", () => {
  const counter = document.querySelector("[data-counter]");
  if (!counter) return;

  const counterButtonPlus = counter.querySelector("[data-counter-plus]");
  const counterInput = counter.querySelector("[data-counter-input]");
  const counterButtonMinus = counter.querySelector("[data-counter-minus]");
  let currentValue = +counterInput.value || 1;

  const increment = () => {
    currentValue += 1;
    counterInput.value = currentValue;
  };

  const decrement = () => {
    if (currentValue > 1) {
      currentValue -= 1;
    }
    counterInput.value = currentValue;
  };

  counterInput.addEventListener("input", (evt) => {
    if (+evt.target.value < 1) {
      currentValue = 1;
    } else {
      currentValue = evt.target.value;
    }
    counterInput.value = currentValue;
  });

  counterButtonPlus.addEventListener("click", increment);
  counterButtonMinus.addEventListener("click", decrement);

});