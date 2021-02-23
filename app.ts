let current = ["9", "0", "0"];
let target: string[] = [];
const pageHolder = document.getElementById("numberHolder");
const displayHolder = document.getElementById("displayHolder");

display(current, pageHolder);

document.addEventListener("keypress", (event) => {
  if (event.code.match(/^Digit[0-9]$/)) {
    target.push(event.code.replace("Digit", ""));
    display(target, pageHolder);

    if (target.length >= 3) {
      target = target.slice(0, 3);
      display(current, pageHolder);

      const targetNumber = Number(target.join(""));
      let currentNumber = Number(current.join(""));

      current = target;
      target = [];

      const timer = setInterval(() => {
        if (currentNumber !== targetNumber) {
          currentNumber += 1;

          if (currentNumber === 1000) {
            currentNumber = 1;
          }

          display(currentNumber, pageHolder);
        }

        if (currentNumber === targetNumber) {
          clearInterval(timer);

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
// type lower number when on higher:
//   ignores 1st time then immediately changes (no counting) subsequent times
// num speed variation
// page number doesn't exist
