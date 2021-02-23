import "regenerator-runtime/runtime";
import { content } from "./content";

let numDisplay1 = "";
let numDisplay2 = "";
let numDisplay3 = "";
let currentDisplay = "100";
let targetDisplay = currentDisplay;

const counterHolder = document.getElementById("counterHolder");
const targetHolder = document.getElementById("targetHolder");
const contentHolder = document.getElementById("contentHolder");
const navHolder = document.getElementById("navHolder");

setNav(content, navHolder);

displayPageNumber(currentDisplay, counterHolder);
displayPageNumber(targetDisplay, targetHolder);
displayContent(currentDisplay);

document.addEventListener("keypress", async function (event) {
  if (event.code.match(/^Digit[0-9]$/)) {
    const keyPress = event.code.replace("Digit", "");

    if (numDisplay1 && numDisplay2 && numDisplay3) {
      numDisplay1 = "";
      numDisplay2 = "";
      numDisplay3 = "";
      // stop the page count if running - weird bug
    }

    if (numDisplay1 && numDisplay2 && !numDisplay3) {
      numDisplay3 = keyPress;
      targetDisplay = `${numDisplay1}${numDisplay2}${numDisplay3}`;

      displayPageNumber(targetDisplay, targetHolder);

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

        displayPageNumber(current, counterHolder);
      }

      if (current === target) {
        displayPageNumber(
          `${numDisplay1}${numDisplay2}${numDisplay3}`,
          counterHolder
        );
        currentDisplay = targetDisplay;
        displayContent(currentDisplay);
      }
    }

    if (numDisplay1 && !numDisplay2 && !numDisplay3) {
      numDisplay2 = keyPress;
      displayPageNumber(`-${numDisplay1}${numDisplay2}`, targetHolder);
    }

    if (!numDisplay1 && !numDisplay2 && !numDisplay3) {
      numDisplay1 = keyPress;
      displayPageNumber(`--${numDisplay1}`, targetHolder);
    }
  }
});

function displayPageNumber(data: string | number, elem: HTMLElement): void {
  elem.innerText = `${data}`;
}

function displayContent(data) {
  const page = content.find((page) => page.id === Number(data));
  contentHolder.innerHTML = page.body;
}

function setNav(content, navHolder) {
  const ul = document.createElement("ul");

  for (const page of Array.from(content)) {
    const li = document.createElement("li");
    li.innerText = `${page["title"]} ${page["id"]}`;
    ul.appendChild(li);
  }

  navHolder.appendChild(ul);
}
