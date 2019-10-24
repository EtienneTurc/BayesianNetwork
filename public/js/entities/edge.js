class Edge {
	constructor(node1, node2) {
		this.node1 = node1
		this.node2 = node2
		this.selected = false
	}

	drawEdge(ctx) {
		ctx.lineWidth = LINE_WIDTH;
		// Draw line
		ctx.beginPath();
		ctx.moveTo(this.node1.x, this.node1.y);
		ctx.lineTo(this.node2.x, this.node2.y);
		ctx.closePath()

		// Color the line
		ctx.strokeStyle = EDGE_COLOR;
		if (this.selected) {
			ctx.strokeStyle = EDGE_COLOR_SELECTED;
		}
		ctx.stroke();
	}

	intersect(x, y) {
		return Math.sqrt((this.node1.x - x) * (this.node1.x - x) + (this.node1.y - y) * (this.node1.y - y)) + Math.sqrt((this.node2.x - x) * (this.node2.x - x) + (this.node2.y - y) * (this.node2.y - y)) <= Math.sqrt((this.node1.x - this.node2.x) * (this.node1.x - this.node2.x) + (this.node1.y - this.node2.y) * (this.node1.y - this.node2.y)) + EDGE_SELECTOR_EPSILON
	}
}
