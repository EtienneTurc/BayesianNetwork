function drawArrow(node, mouse) {
	konva_arrow = new Konva.Arrow({
		points: [node.konva_node.getX(), node.konva_node.getY(), mouse.x, mouse.y],
		pointerLength: POINTER_LENGTH,
		pointerWidth: POINTER_WIDTH,
		fill: EDGE_FILL_COLOR,
		stroke: EDGE_STROKE_COLOR,
		strokeWidth: LINE_WIDTH
	});
	konva_arrow.listening(false)
	layer.add(konva_arrow)
	konva_arrow.moveToBottom()
}

function destroyArrow() {
	if (konva_arrow)
		konva_arrow.destroy()
	konva_arrow = null
}

function moveArrow(node, mouse) {
	if (mouseOnNode && mouseOnNode.id != node.id) {
		let points = [node.konva_node.getX(), node.konva_node.getY(), mouseOnNode.konva_node.getX(), mouseOnNode.konva_node.getY()]
		ppints = outerNode(points)
		konva_arrow.setPoints(points)
	} else {
		konva_arrow.setPoints([node.konva_node.getX(), node.konva_node.getY(), mouse.x, mouse.y])
	}
}

function moveEdgesRelatedTo(node, edges) {
	for (let e of edges) {
		if (e.nodes[0].id == node.id || e.nodes[1].id == node.id) {
			e.moveEdge()
		}
	}
}
