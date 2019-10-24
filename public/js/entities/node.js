class Node {
	constructor(x, y, name = DEFAULT_NODE_NAME) {
		id++
		this.id = id
		this.name = name
		this.parents = []
		this.proba = [[0, 1]]
		this.value = -1
		this.proba_computed = 0

		this.selected = true
		this.linked = false

		this.drawNode(x, y)
		this.drawNodeName()

		layer.add(this.konva_node)
		layer.add(this.konva_node_name)
	}

	drawNode(x, y) {
		this.konva_node = new Konva.Circle({
			x: x,
			y: y,
			radius: NODE_RADIUS,
			fill: NODE_BACKGROUND_COLOR_SELECTED,
			stroke: 'black',
			strokeWidth: LINE_WIDTH,
			draggable: true
		});

		nodeListeners(this, this.konva_node)
	}

	drawNodeName() {
		this.konva_node_name = new Konva.Text({
			x: this.konva_node.getX() - NODE_RADIUS * 0.9,
			y: this.konva_node.getY() - NODE_RADIUS * 0.3,
			text: this.name,
			fontSize: FONT_SIZE,
			fontFamily: FONT,
			width: NODE_RADIUS * 1.8,
			fill: TEXT_COLOR,
			align: 'center',
			wrap: 'word'
		});
		this.konva_node_name.listening(false)
	}

	moveText() {
		this.konva_node_name.setX(this.konva_node.getX() - NODE_RADIUS * 0.9)
		this.konva_node_name.setY(this.konva_node.getY() - NODE_RADIUS * 0.3)
	}

	setColor(color) {
		this.konva_node.fill(color)
	}

	eraseNode() {
		this.konva_node.destroy()
		this.konva_node_name.destroy()
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
}
