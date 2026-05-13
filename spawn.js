const API_URL = "http://play.hatlas.net:3000/v1/";
const form = document.querySelector("#chooseMob");
const select = document.querySelector("#arenachoose");
const tableBody = document.querySelector("#entitiesTableBody");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(API_URL + "entities");
  const data = await response.json();
  console.log(data);
  searchmob();
  for (let i = 0; i < data.length; i++) {
    const neuille = document.createElement("option");
    neuille.setAttribute("value", data[i].id);
    neuille.textContent = data[i].name;
    select.appendChild(neuille);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newdata = new FormData(form);
  const entityId = parseInt(newdata.get("mob"));
  const x = Number.parseInt(newdata.get("coX"));
  const z = Number.parseInt(newdata.get("coZ"));
  console.log(parseInt(entityId));
  spawnEntities(entityId, x, z);
});

async function spawnEntities(a, b, c) {
  const body = {
    entityId: a,
    x: b,
    z: c,
  };
  const response = await fetch(API_URL + "arena/entities", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log(data);
}

async function searchmob() {
  const response = await fetch(API_URL + "arena/entities");

  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    img.setAttribute("src", data[i].entity.icon);
    img.width = 40;

    tdImg.appendChild(img);
    const tdName = document.createElement("td");
    tdName.textContent = data[i].entity.name;

    const tdX = document.createElement("td");
    tdX.textContent = data[i].arena.x;

    const tdZ = document.createElement("td");
    tdZ.textContent = data[i].arena.z;

    const tdstrength = document.createElement("td");
    tdstrength.textContent = data[i].entity.strength;

    const button = document.createElement("button");

    button.textContent = "DELETE";

    button.classList.add("btndel");

    tr.appendChild(tdImg);
    tr.appendChild(tdName);
    tr.appendChild(tdX);
    tr.appendChild(tdZ);
    tr.appendChild(tdstrength);
    tr.appendChild(button);
    tr.classList.add("tblbody");
    tableBody.appendChild(tr);
  }
}
