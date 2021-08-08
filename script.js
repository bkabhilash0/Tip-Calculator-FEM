console.log("Working...");

const price = document.getElementById("price");
const people = document.getElementById("people");
const bill_price = document.getElementById("bill-price");
const bill_tip = document.getElementById("bill-tip");
let discount = document.querySelector(".btn.active");
const discount_buttons = document.querySelectorAll(".buttons > button.btn");
const custom_discount = document.getElementById("custom_btn");
const reset = document.getElementById("reset");

// Add event listeners to All the Buttons to toggle active class.
for (const btn of discount_buttons) {
  btn.addEventListener("click", () => {
    btn.classList.add("active");
    discount.classList.remove("active");
    discount = btn;
    result();
  });
}

// Handler to reset all values when reset button is pressed.
const resetHandler = () => {
  price.value = "";
  people.value = "";
  custom_discount.value = "";
  bill_price.innerText = "$00.00";
  bill_tip.innerText = "$00.00";
};

// Handler to handle change in input and validate the input.
const onChangeHandler = (type, e) => {
  const value = e.target.value;
  if (type === "people") {
    if (value > 0) {
      people.classList.remove("invalid");
      result();
    } else {
      people.classList.add("invalid");
    }
  } else {
    result();
  }
};

// Main Function to calculate the result i.e the Amount and Tip
const result = () => {
  let rebate =
    +custom_discount.value <= 0 ? +discount.value : +custom_discount.value;
  const entered_price = +price.value;
  const num_of_people = +people.value <= 0 ? 1 : +people.value;
  let tip_amount = 0;
  let total_amount = 0;

  if (tip_amount && total_amount === 0) {
    bill_price.innerText = "$00.00";
  } else {
    tip_amount = ((entered_price / num_of_people) * rebate) / 100;
  }
  total_amount = entered_price / num_of_people + tip_amount;
  bill_tip.innerText = `$${tip_amount.toFixed(2)}`;
  bill_price.innerText = `$${total_amount.toFixed(2)}`;
};

// Hooking up all the event listeners to to respective Element.
price.addEventListener("input", onChangeHandler.bind(null, ""));
people.addEventListener("input", onChangeHandler.bind(this, "people"));
custom_discount.addEventListener("input", onChangeHandler.bind(null, ""));
reset.addEventListener("click", resetHandler);
