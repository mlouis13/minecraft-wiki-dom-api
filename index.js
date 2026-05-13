const URL = "http://10.69.4.208:3000/v1/";
const form = document.querySelector("#searchEntity");
const tabEntity = document.querySelector("#tabEntity");
const remove = document.querySelector("#remove");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(form);
	const name = data.get("name");
	const classification = data.get("classification");
	const type = data.get("type");
	const health = data.get("health");
	const armor = data.get("armor");
	const damage = data.get("damage");
	searchEntities(name, classification, type, health, armor, damage);
	tabEntity.classList.remove("noentity");
	tabEntity.classList.add("noentity2");
});
async function searchEntities(
	name,
	classification,
	type,
	health,
	armor,
	damage,
) {
	let response = await fetch(URL + "entities");
	let responseJS = await response.json();
	console.log(responseJS);
	remove.remove();

	for (let i = 0; i < responseJS.length; i++) {
		const name1 = document.createElement("h2");
		name1.classList.add("name");
		name1.textContent = responseJS[i].name;
		const img = document.createElement("img");
		img.setAttribute("src", responseJS[i].image);
		img.style.width = "210px";
		img.style.height = "150px";
		const div = document.createElement("div");
		div.classList.add("align");
		const classification1 = document.createElement("p");
		classification1.textContent = responseJS[i].classification;
		classification1.classList.add("fauxA");
		const type1 = document.createElement("p");
		type1.classList.add("type");
		type1.textContent = responseJS[i].type;
		const hr = document.createElement("hr");
		hr.classList.add("hr");
		const btn = document.createElement("button");
		btn.textContent = "SEE MORE";
		btn.classList.add("btn");
		const card = document.createElement("div");
		card.classList.add("div");
		if (responseJS[i].type == "neutral") {
			card.classList.add("divbeige");
			card.classList.remove("div");
			name1.classList.add("namebeige");
			name1.classList.add("name");
			hr.classList.add("hrbeige");
			hr.classList.remove("hr");
			btn.classList.add("btnbeige");
			btn.classList.remove("btn");
		} else if (responseJS[i].type == "hostile") {
			card.classList.add("divred");
			card.classList.remove("div");
			name1.classList.add("namered");
			name1.classList.add("name");
			hr.classList.add("hrred");
			hr.classList.remove("hr");
			btn.classList.add("btnred");
			btn.classList.remove("btn");
		}
		div.append(classification1, type1);
		card.append(name1, img, div, hr, btn);
		tabEntity.appendChild(card);
	}
}
