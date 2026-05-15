const URL = "http://play.hatlas.net:3000/v1/";
const card = document.querySelector("#card");
const name2 = document.querySelector("#name");
const name3 = document.querySelector("#name2");
const name4 = document.querySelector("#name3");
const description = document.querySelector("#description");
const icon = document.querySelector("#icon");
const img = document.querySelector("#img");
const hp = document.querySelector("#hp");
const shield = document.querySelector("#shield");
const strength = document.querySelector("#sharpness");
const behavior = document.querySelector("#behavior");
const classification = document.querySelector("#class");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const color1 = document.querySelector(".mobscontent");
const color2 = document.querySelector(".namemobspic");
const color3 = document.querySelector("h3");
const color4 = document.querySelector("#hr");
const color5 = document.querySelector("#hr2");
const color6 = document.querySelector("#hr3");
const color7 = document.querySelector("#hr4");
const color8 = document.querySelector("#hr5");
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
      name2.textContent = responseJS[i].name;
      name3.textContent = responseJS[i].name;
      name4.textContent = responseJS[i].name;
      description.textContent = responseJS[i].description;
      console.log(responseJS[i].description);
      icon.setAttribute("src", responseJS[i].icon);
      img.setAttribute("src", responseJS[i].img);
      strength.textContent = responseJS[i].strength;
      hp.textContent = responseJS[i].health;
      shield.textContent = responseJS[i].armor;
      classification.textContent = responseJS[i].classification;
      behavior.textContent = responseJS[i].type;
      width.textContent = responseJS[i].width;
      height.textContent = responseJS[i].height;
      if (responseJS[i].type == "hostile") {
        color1.style.border = "2px solid #D24646";
        color2.style.backgroundColor = "#D24646";
        color3.style.backgroundColor = "#D24646";
        color4.style.backgroundColor = "#D24646";
        color5.style.backgroundColor = "#D24646";
        color6.style.backgroundColor = "#D24646";
        color7.style.backgroundColor = "#D24646";
        color8.style.backgroundColor = "#D24646";
      } else if (responseJS[i].type == "neutral") {
        color1.style.border = "2px solid #E3B599";
        color2.style.backgroundColor = "#E3B599";
        color3.style.backgroundColor = "#E3B599";
        color4.style.backgroundColor = "#E3B599";
        color5.style.backgroundColor = "#E3B599";
        color6.style.backgroundColor = "#E3B599";
        color7.style.backgroundColor = "#E3B599";
        color8.style.backgroundColor = "#E3B599";
      }
    }
  }
}
