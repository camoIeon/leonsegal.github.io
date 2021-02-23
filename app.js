// initialise
let current = ["1", "0", "0"];
const pageHolder = document.getElementById("numberHolder");
const dummyHolder = document.getElementById("dummyHolder");
pageHolder.innerText = current.join("");

let target = [];

document.addEventListener("keypress", (event) => {
  if (event.code.match(/^Digit[0-9]$/)) {
    target.push(event.code.replace("Digit", ""));
    display(target);

    if (target.length === 3) {
      display(current);

      const targetNumber = Number(target.join(""));
      let currentNumber = Number(current.join(""));

      const timer = setInterval(() => {
        if (currentNumber < targetNumber) {
          currentNumber += 1;

          pageHolder.innerText = currentNumber;
        }

        if (currentNumber === targetNumber) {
          clearInterval(timer);
          current = target;
          target = [];
          display(current);
          dummyHolder.innerText = current.join(""); // delete me
        }
      }, 10);
    }
  }
});

function display(elem) {
  pageHolder.innerText = elem.join("");
}

// wrong num
// num recirculate
// num speed variation
// no matching page
