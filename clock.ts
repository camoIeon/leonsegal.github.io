export async function setClock() {
  const clock = document.getElementById("clockHolder");
  setInterval(() => {
    const date = new Date();
    const dateString = date.toDateString();
    const timeString = date.toLocaleTimeString();
    clock.innerText = `${dateString} ${timeString}`;
  }, 1000);
}
