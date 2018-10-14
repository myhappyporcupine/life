const width = 48;
const height = 24;
const frameRate = 5;

function createTable(world) {
	let table = document.createElement("table");
		for (let y = 0; y < world.height; y++) {
			let tr = document.createElement("tr");
			for (let x = 0; x < world.width; x++) {
				let td = document.createElement("td");
				td.style.width = "10px";
				td.style.height = "10px";
				td.style.border = "1px solid #888";
				if (world.grid[x + y * world.width] == "live")
					td.style.backgroundColor = "#000";
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	return table;
}

function state(world, x, y) {
	return world.grid[x + y * world.width];
}

function neighbors(world, x, y) {
	let count = 0;
	for (let j = y - 1; j <= y + 1; j++)
		for (let i = x - 1; i <= x + 1; i++)
			if (i >= 0 && i < world.width &&
				j >= 0 && j < world.height &&
				!(i == x && j == y) &&
				world.grid[i + j * world.width] == "live")
				count++;
	return count;
}

function step(world) {
	let grid = [];
	for (let y = 0; y < world.height; y++) {
		for (let x = 0; x < world.width; x++) {
			let current = state(world, x, y);
			let count = neighbors(world, x, y);
			let next;
			if (current == "live") {
				if (count < 2) next = "dead";
				else if (count <= 3) next = "live";
				else next = "dead";
			} else {
				if (count == 3) next = "live";
				else next = "dead";
			}
			grid.push(next);
		}
	}
	return {width: world.width, height: world.height, grid};
}

let world = {width: width, height: height};
world.grid = new Array(world.width * world.height).fill().map(cell => {
	if (Math.random() < 0.5) return "live"
	else return "dead"
});
document.body.appendChild(createTable(world));
setInterval(() => {
	world = step(world);
	document.body.querySelector("table").remove();
	document.body.appendChild(createTable(world));
}, 1000 / frameRate);