window.addEventListener('keydown', function (e) {
	if (e.keyCode == DELETE) {
		let res = deleteSelectedNodes(nodes, edges)
		nodes = res[0]
		edges = res[1]
	}

	if (e.keyCode == SHIFT) {
		shift_pressed = true
	}
});

window.addEventListener('keyup', function (e) {
	if (e.keyCode == SHIFT) {
		shift_pressed = false
		node_to_link = null
		destroyArrow()
		layer.draw()
	}
});

container.addEventListener('node-selected', function (e) {
	onSelected(e)
})


container.addEventListener('edge-selected', function (e) {
	onSelected(e)
})

function onSelected(e) {
	for (let node of nodes) {
		if (!e.detail.node || node.id != e.detail.node.id) {
			node.selected = false
			node.setColor()
		}
	}

	for (let edge of edges) {
		if (!e.detail.edge || edge != e.detail.edge) {
			edge.selected = false
			edge.setColor()
		}
	}

	layer.draw()
}

stage.on('dblclick', function () {
	let mouse_pos = getMousePosition(stage)
	let node = new Node(mouse_pos.x, mouse_pos.y)
	nodes.push(node)

	triggerEvent('node-selected', {
		selected: true,
		node: node,
	})

	layer.draw()
})

stage.on('mousemove', function () {
	if (shift_pressed && node_to_link && konva_arrow) {
		moveArrow(node_to_link, getMousePosition(stage))
		layer.draw()
	}
})


stage.on('wheel', function (e) {
	stage.setScaleX(stage.getScaleX() * (1 + SCALE_SPEED * e.evt.wheelDeltaY))
	stage.setScaleY(stage.getScaleX() * (1 + SCALE_SPEED * e.evt.wheelDeltaY))
	layer.draw()
})
