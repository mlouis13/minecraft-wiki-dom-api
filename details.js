const URL = "http://play.hatlas.net:3000/v1/";
const card = document.querySelector("#card");
let params = new URLSearchParams(window.location.search);
let nom = params.get("name");
document.addEventListener("DOMContentLoaded", () => {
  console.log(nom);
  createPage(nom);
});
async function createPage(name) {
  const response = await fetch(URL + "entities");
  const responseJS = await response.json();

  for (let i = 0; i < responseJS.length; i++) {
    if (responseJS[i].name == name) {
      console.log(responseJS[i]);
    }
  }
}
