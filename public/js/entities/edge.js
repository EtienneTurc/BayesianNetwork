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
			fill: EDGE_FILL_COLOR,
			stroke: EDGE_STROKE_COLOR,
			strokeWidth: LINE_WIDTH,
			hitStrokeWidth: 25,
		});

		edgeListeners(this, this.konva_edge)
	}

	moveEdge() {
		let points = [this.nodes[0].konva_node.getX(), this.nodes[0].konva_node.getY(), this.nodes[1].konva_node.getX(), this.nodes[1].konva_node.getY()]
		points = outerNode(points)
		this.konva_edge.setPoints(points)
	}

	setColor() {
		let color_fill = this.selected ? EDGE_FILL_COLOR_SELECTED : EDGE_FILL_COLOR
		let color_stroke = this.selected ? EDGE_STROKE_COLOR_SELECTED : EDGE_STROKE_COLOR
		this.konva_edge.fill(color_fill)
		this.konva_edge.stroke(color_stroke)
	}

	eraseEdge() {
		this.konva_edge.destroy()
	}

	intersect(x, y) {
		return Math.sqrt((this.nodes[0].x - x) * (this.nodes[0].x - x) + (this.nodes[0].y - y) * (this.nodes[0].y - y)) + Math.sqrt((this.nodes[1].x - x) * (this.nodes[1].x - x) + (this.nodes[1].y - y) * (this.nodes[1].y - y)) <= Math.sqrt((this.nodes[0].x - this.nodes[1].x) * (this.nodes[0].x - this.nodes[1].x) + (this.nodes[0].y - this.nodes[1].y) * (this.nodes[0].y - this.nodes[1].y)) + EDGE_SELECTOR_EPSILON
	}
}
