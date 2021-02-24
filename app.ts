import "regenerator-runtime/runtime";
import { content } from "./content";
import { setClock } from "./clock";

setClock().catch(console.error);

let numDisplays = [];
let currentDisplay = "100";
let targetDisplay = currentDisplay;

const counterHolder = document.getElementById("counterHolder");
const targetHolder = document.getElementById("targetHolder");
const contentHolder = document.getElementById("contentHolder");
const navHolder = document.getElementById("navHolder");
let isSearching = false;

setNav(content, navHolder);

displayCounterNumber(currentDisplay);
displayTargetNumber(targetDisplay);
displayContent(currentDisplay);

document.addEventListener("keypress", async function (event) {
  if (event.code.match(/^Digit[0-9]$/)) {
    if (numDisplays.length === 3) {
      numDisplays = [];
      isSearching = false;
    }

    const keyPress = event.code.replace("Digit", "");
    numDisplays.push(keyPress);

    if (numDisplays.length == 3) {
      isSearching = true;

      displayTargetNumber(numDisplays);

      targetDisplay = numDisplays.join("");

      let current = Number(currentDisplay);
      let target = Number(targetDisplay);
      const timeIntervals = getRandomTimeIntervals({
        smallCount: 200,
        smallValue: 10,
        largeCount: 7,
        largeValue: 250,
      });
      timeIntervals.push(1000);

      while (current !== target && isSearching) {
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            timeIntervals[Math.floor(Math.random() * timeIntervals.length)]
          )
        );

        current += 1;

        if (current === 512) {
          current = 1;
        }

        displayCounterNumber(current);
      }

      displayCounterNumber(numDisplays);
      currentDisplay = targetDisplay;
      displayContent(currentDisplay);

      isSearching = false;
    }

    if (numDisplays.length < 3) {
      displayTargetNumber(numDisplays);
    }
  }
});

function displayCounterNumber(data: string[] | number | string): void {
  displayNumber(data, counterHolder);
}

function displayTargetNumber(data: string[] | string): void {
  displayNumber(data, targetHolder);
}

function displayNumber(data: string[] | number | string, elem: HTMLElement) {
  if (Array.isArray(data)) {
    const output = data.join("");
    elem.innerText = output.padStart(3, "-");
  } else {
    elem.innerText = `${data}`.padStart(3, "0");
  }
}

function displayContent(id) {
  const page = content.find((page) => page["id"] === Number(id));

  if (page) {
    const body = document.createElement("div");
    const bodyTitle = document.createElement("h2");

    bodyTitle.innerText = page["title"];
    bodyTitle.classList.add("white_text");

    const bodyText = document.createElement("p");

    bodyText.innerText = page["body"];
    body.appendChild(bodyTitle);
    body.appendChild(bodyText);

    contentHolder.innerHTML = body.innerHTML;
  } else {
    contentHolder.innerText = "Page not found";
  }
}

function setNav(content, navHolder) {
  const navContainer = document.createElement("div");
  navContainer.classList.add("flex");
  navContainer.classList.add("jc_sb");
  navContainer.classList.add("ml10");
  navContainer.classList.add("mr10");

  for (const page of content) {
    if (Number(page["id"]) < 301) {
      const pageContainer = document.createElement("span");
      const id = document.createElement("span");

      id.innerText = page["id"];
      id.classList.add("white_text");

      const title = document.createElement("span");

      title.innerText = page["title"];
      title.classList.add("mr10");

      pageContainer.appendChild(title);
      pageContainer.appendChild(id);

      navContainer.appendChild(pageContainer);
    }
  }

  navHolder.appendChild(navContainer);
}

function getRandomTimeIntervals({
  smallCount,
  smallValue,
  largeCount,
  largeValue,
}: {
  smallCount: number;
  smallValue: number;
  largeCount: number;
  largeValue: number;
}) {
  const output = [];

  for (const elem of [...Array(smallCount).keys()]) {
    output.push(smallValue);
  }

  for (const elem of [...Array(largeCount).keys()]) {
    output.push(largeValue);
  }

  return output;
}
