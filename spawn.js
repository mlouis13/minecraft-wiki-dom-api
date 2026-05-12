const API_URL = "http://10.69.4.208:3000/v1/";
const form = document.querySelector("#chooseMob");
const select = document.querySelector("#arenachoose");

document.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch(API_URL + "entities");
	const data = await response.json();
	console.log(data);
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
	const x = newdata.get("coX");
	const z = newdata.get("coZ");
	console.log(parseInt(entityId));
	spawnEntities(entityId, x, z);
});



async function spawnEntities(a, b, c) {
	const response = await fetch(API_URL + "arena/entities", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			entityId: a,
			x: b,
			z: c,
		}),
	});

	const data = await response.json();
	console.log(data);
}
