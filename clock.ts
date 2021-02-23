export async function setClock() {
  const clock = document.getElementById("clockHolder");
  const date = new Date();
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();
  clock.innerText = `${dateString} ${timeString}`;
}
