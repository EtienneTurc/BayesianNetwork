class Node {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.dragged = false
	}

	drawNode(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, NODE_RADIUS, 0, Math.PI * 2, 0)
		ctx.fillStyle = NODE_OUTER_COLOR;
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = NODE_BACKGROUND_COLOR;
		ctx.fill();
	}

	setPos(x, y) {
		this.x = x
		this.y = y
	}

	intersect(x, y) {
		return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y)) <= NODE_RADIUS
	}
}
