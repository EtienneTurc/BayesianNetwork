class Edge {
	constructor(node1, node2) {
		this.node1 = node1,
			this.node2 = node2
	}

	drawEdge(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.node1.x, this.node1.y);
		ctx.lineTo(this.node2.x, this.node2.y);
		ctx.fillStyle = EDGE_COLOR;
		ctx.closePath()
		ctx.stroke();
	}
}
