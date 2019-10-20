class Node {
	constructor(x, y, name = DEFAULT_NODE_NAME) {
		this.x = x
		this.y = y
		this.name = name
		this.dragged = false
		this.selected = false
	}

	drawNode(ctx) {
		// Draw the node
		ctx.beginPath();
		ctx.arc(this.x, this.y, NODE_RADIUS, 0, Math.PI * 2, 0)
		ctx.closePath();

		// Outer line of the node
		ctx.fillStyle = NODE_OUTER_COLOR;
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

	intersect(x, y) {
		return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y)) <= NODE_RADIUS
	}
}
