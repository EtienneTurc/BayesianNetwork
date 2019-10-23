class Node {
	constructor(x, y, name = DEFAULT_NODE_NAME) {
		this.x = x
		this.y = y
		this.name = name
		this.dragged = false
		this.selected = true
		this.proba = [[0, 1]]
		this.parents = []
		this.value = -1
		this.proba_computed = 0
	}

	drawNode(ctx) {
		ctx.lineWidth = LINE_WIDTH;
		// Draw the node
		ctx.beginPath();
		ctx.arc(this.x, this.y, NODE_RADIUS, 0, Math.PI * 2, 0)
		ctx.closePath();

		// Outer line of the node
		ctx.strokeStyle = NODE_OUTER_COLOR;
		ctx.stroke();

		// Background of the node
		ctx.fillStyle = NODE_BACKGROUND_COLOR;
		if (this.selected) {
			ctx.fillStyle = NODE_BACKGROUND_COLOR_SELECTED
		}
		ctx.fill();

		// Display name
		ctx.fillStyle = TEXT_COLOR;
		ctx.font = FONT;
		ctx.textAlign = "center"
		ctx.fillText(this.name, this.x, this.y);
	}

	setPos(x, y) {
		this.x = x
		this.y = y
	}

	addParent(parent_node) {
		this.parents.push(parent_node)
		this.proba = this.proba.concat(this.proba)
	}

	deleteParents(to_delete) {
		let parents_to_delete = []
		let parents_to_keep = []
		for (let index in this.parents) {
			if (to_delete.includes(this.parents[index])) {
				parents_to_delete.push(index)
			} else {
				parents_to_keep.push(this.parents[index])
			}
		}
		this.parents = parents_to_keep

		let index_to_keep = parents_to_delete.map(val => Math.pow(2, val))
		let new_proba = []
		for (let index in this.proba) {
			let go_next = false
			for (let val of index_to_keep) {
				if (!(parseInt(index / val) % 2)) {
					go_next = true
				}
				break
			}
			if (!go_next) {
				new_proba.push(this.proba[index])
			}
		}
		this.proba = new_proba
	}


	intersect(x, y) {
		return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y)) <= NODE_RADIUS
	}
}
