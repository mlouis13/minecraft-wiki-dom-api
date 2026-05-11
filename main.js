const burger = document.querySelector("#change");
const dialog = document.querySelector("#test");
const closeModal = document.querySelector("#closeModal");

burger.addEventListener("click", () => {
  console.log("lol");
  dialog.showModal();
});
closeModal.addEventListener("click", () => {
  console.log("lol");
  dialog.close();
});
