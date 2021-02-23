let current = ["1", "0", "0"];
let target: string[] = [];
const pageHolder = document.getElementById("numberHolder");
const displayHolder = document.getElementById("displayHolder");

display(current, pageHolder);

document.addEventListener("keypress", (event) => {
  if (event.code.match(/^Digit[0-9]$/)) {
    target.push(event.code.replace("Digit", ""));
    display(target, pageHolder);

    if (target.length === 3) {
      display(current, pageHolder);

      const targetNumber = Number(target.join(""));
      let currentNumber = Number(current.join(""));

      const timer = setInterval(() => {
        if (currentNumber < targetNumber) {
          currentNumber += 1;

          display(currentNumber, pageHolder);
        }

        if (currentNumber === targetNumber) {
          clearInterval(timer);
          current = target;
          target = [];
          display(current, pageHolder);
          display(current, displayHolder);
        }
      }, 10);
    }
  }
});

function display(data: string[] | number, elem: HTMLElement): void {
  if (Array.isArray(data)) {
    elem.innerText = data.join("");
  } else {
    elem.innerText = `${data}`;
  }
}

// Tests:
// wrong num
// num recirculate
// num speed variation
// no matching page
// too many numbers typed
// handle trailing zeroes
