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
let isSearching = false;

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
      isSearching = false;
    }

    if (numDisplay1 && numDisplay2 && !numDisplay3) {
      isSearching = true;
      numDisplay3 = keyPress;
      targetDisplay = `${numDisplay1}${numDisplay2}${numDisplay3}`;

      displayPageNumber(targetDisplay, targetHolder);

      let current = Number(currentDisplay);
      let target = Number(targetDisplay);
      const timeIntervals = getRandomTimeIntervals({
        smallCount: 100,
        smallValue: 10,
        largeCount: 5,
        largeValue: 250,
      });

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

      isSearching = false;
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
  const page = content.find((page) => page["id"] === Number(data));
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
  const ul = document.createElement("ul");
  ul.classList.add("width30pc");

  for (const page of content) {
    if (Number(page["id"]) !== 501) {
      const li = document.createElement("li");
      const id = document.createElement("span");
      id.innerText = page["id"];
      id.classList.add("white_text");

      const title = document.createElement("span");
      title.innerText = page["title"];

      li.appendChild(title);
      li.appendChild(id);
      li.classList.add("flex");
      li.classList.add("jc_sb");
      ul.appendChild(li);
    }
  }

  navHolder.appendChild(ul);
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
