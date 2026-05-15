const API_URL = "http://play.hatlas.net:3000/v1/";

const form = document.querySelector("#chooseMob");
const select = document.querySelector("#arenachoose");
const tableBody = document.querySelector("#entitiesTableBody");
const arena = document.querySelector("#terrain");

const ARENA_WIDTH = 37;
const ARENA_HEIGHT = 16;

document.addEventListener("DOMContentLoaded", async () => {
	await loadEntitiesOptions();
	await loadArena();
	await checkArenaStatus();

	setInterval(async () => {
		await loadArena();
		await checkArenaStatus();
	}, 3000);
});

async function loadEntitiesOptions() {
	const response = await fetch(API_URL + "entities");
	const data = await response.json();

	select.innerHTML = "";

	for (const entity of data) {
		const option = document.createElement("option");
		option.value = entity.id;
		option.textContent = entity.name;
		select.appendChild(option);
	}
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(form);

	const entityId = parseInt(formData.get("mob"));
	const x = parseInt(formData.get("coX"));
	const z = parseInt(formData.get("coZ"));

	await spawnEntity(entityId, x, z);
	await loadArena();
});

async function spawnEntity(entityId, x, z) {
	await fetch(API_URL + "arena/entities", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			entityId,
			x,
			z,
		}),
	});
}

async function deleteEntity(id) {
	await fetch(API_URL + "arena/entities/" + id, {
		method: "DELETE",
	});
}

async function loadArena() {
	const response = await fetch(API_URL + "arena/entities");
	const mobs = await response.json();
	console.log(mobs);
	tableBody.innerHTML = "";
	arena.innerHTML = "";

	for (const mob of mobs) {
		renderTableRow(mob);
		renderMobOnArena(mob);
	}
}

function renderTableRow(mob) {
	const tr = document.createElement("tr");

	const tdImg = document.createElement("td");
	const img = document.createElement("img");
	img.src = mob.entity.icon;
	img.width = 40;
	tdImg.appendChild(img);

	const tdName = document.createElement("td");
	tdName.textContent = mob.entity.name;

	const tdX = document.createElement("td");
	tdX.textContent = mob.x;

	const tdZ = document.createElement("td");
	tdZ.textContent = mob.z;

	const tdStrength = document.createElement("td");
	tdStrength.textContent = mob.entity.strength;

	const tdAction = document.createElement("td");
	const button = document.createElement("button");
	button.textContent = "DELETE";
	button.classList.add("btndel");

	button.addEventListener("click", async () => {
		await deleteEntity(mob.id);
		await loadArena();
	});

	tdAction.appendChild(button);

	tr.append(tdImg, tdName, tdX, tdZ, tdStrength, tdAction);
	tableBody.appendChild(tr);
}

function renderMobOnArena(mob) {
	const wrapper = document.createElement("div");
	wrapper.classList.add("mob-wrapper");

	const img = document.createElement("img");
	img.src = mob.entity.icon;
	img.classList.add("mob");

	const label = document.createElement("div");
	label.classList.add("mob-label");
	label.textContent = `${mob.x}, ${mob.z}`;

	const xPercent = (mob.x / ARENA_WIDTH) * 100;
	const zPercent = (mob.z / ARENA_HEIGHT) * 100;

	wrapper.style.left = xPercent + "%";
	wrapper.style.top = zPercent + "%";

	wrapper.appendChild(img);
	wrapper.appendChild(label);

	arena.appendChild(wrapper);
}
async function checkArenaStatus() {
	const response = await fetch(API_URL + "arena");
	const data = await response.json();

	console.log(data);

	const isClosed = data.status === "close";

	const inputs = document.querySelectorAll("input, select, button");
	const statusText = document.querySelector(".isOpen");

	inputs.forEach((element) => {
		element.disabled = isClosed;

		if (isClosed) {
			element.style.backgroundColor = "#DBDBDB";
			element.style.color = "#8E8E8E";
			element.style.cursor = "not-allowed";
			statusText.textContent = "CLOSED";
			statusText.style.backgroundColor = "#F25959";
			statusText.style.color = "white";
		} else {
			element.style.backgroundColor = "";
			element.style.color = "";
			element.style.cursor = "";
			statusText.textContent = "OPEN";
			statusText.style.backgroundColor = "green";
			statusText.style.color = "white";
		}
	});
}
