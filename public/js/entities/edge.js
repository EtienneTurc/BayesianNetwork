class Edge {
	constructor(node1, node2) {
		this.nodes = [node1, node2]
		this.selected = false

		this.drawEdge()

		layer.add(this.konva_edge)
		this.konva_edge.moveToBottom()
	}

	drawEdge() {
		let points = [this.nodes[0].konva_node.getX(), this.nodes[0].konva_node.getY(), this.nodes[1].konva_node.getX(), this.nodes[1].konva_node.getY()]
		points = outerNode(points)
		this.konva_edge = new Konva.Arrow({
			points: points,
			pointerLength: POINTER_LENGTH,
			pointerWidth: POINTER_WIDTH,
			fill: EDGE_COLOR,
			stroke: EDGE_COLOR,
			strokeWidth: LINE_WIDTH
		});
	}

	moveEdge() {
		let points = [this.nodes[0].konva_node.getX(), this.nodes[0].konva_node.getY(), this.nodes[1].konva_node.getX(), this.nodes[1].konva_node.getY()]
		points = outerNode(points)
		this.konva_edge.setPoints(points)
	}

	intersect(x, y) {
		return Math.sqrt((this.nodes[0].x - x) * (this.nodes[0].x - x) + (this.nodes[0].y - y) * (this.nodes[0].y - y)) + Math.sqrt((this.nodes[1].x - x) * (this.nodes[1].x - x) + (this.nodes[1].y - y) * (this.nodes[1].y - y)) <= Math.sqrt((this.nodes[0].x - this.nodes[1].x) * (this.nodes[0].x - this.nodes[1].x) + (this.nodes[0].y - this.nodes[1].y) * (this.nodes[0].y - this.nodes[1].y)) + EDGE_SELECTOR_EPSILON
	}
}
