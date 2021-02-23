import "regenerator-runtime/runtime";

let numDisplay1 = "";
let numDisplay2 = "";
let numDisplay3 = "";
let currentDisplay = "100";
let targetDisplay = "";

const counterHolder = document.getElementById("counterHolder");
const currentHolder = document.getElementById("currentHolder");
const targetHolder = document.getElementById("targetHolder");

display(currentDisplay, counterHolder);

document.addEventListener("keypress", async function (event) {
  if (event.code.match(/^Digit[0-9]$/)) {
    const keyPress = event.code.replace("Digit", "");

    if (numDisplay1 && numDisplay2 && numDisplay3) {
      numDisplay1 = "";
      numDisplay2 = "";
      numDisplay3 = "";
    }

    if (numDisplay1 && numDisplay2 && !numDisplay3) {
      numDisplay3 = keyPress;
      targetDisplay = `${numDisplay1}${numDisplay2}${numDisplay3}`;

      display(targetDisplay, targetHolder);

      let current = Number(currentDisplay);
      let target = Number(targetDisplay);
      const timeIntervals = [
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        400,
        20,
        20,
        50,
        50,
      ];

      while (current !== target) {
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            timeIntervals[Math.floor(Math.random() * timeIntervals.length)]
          )
        );

        current += 1;

        if (current === 600) {
          current = 1;
        }

        display(current, counterHolder);
      }

      if (current === target) {
        display(`${numDisplay1}${numDisplay2}${numDisplay3}`, counterHolder);
        display(`${numDisplay1}${numDisplay2}${numDisplay3}`, currentHolder);
        currentDisplay = targetDisplay;
      }
    }

    if (numDisplay1 && !numDisplay2 && !numDisplay3) {
      numDisplay2 = keyPress;
      display(`-${numDisplay1}${numDisplay2}`, targetHolder);
    }

    if (!numDisplay1 && !numDisplay2 && !numDisplay3) {
      numDisplay1 = keyPress;
      display(`--${numDisplay1}`, targetHolder);
    }
  }
});

function display(data: string | number, elem: HTMLElement): void {
  elem.innerText = `${data}`;
}
