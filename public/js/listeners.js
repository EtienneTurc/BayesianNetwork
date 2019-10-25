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
	let mouse_pos = stage.getPointerPosition()
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
		moveArrow(node_to_link, stage.getPointerPosition())
		layer.draw()
	}
})

function edgeListeners(edge, konva_edge) {
	konva_edge.on('dblclick', function (e) {
		e.cancelBubble = true;
		edge.selected = !edge.selected
		edge.setColor()

		triggerEvent('edge-selected', {
			selected: true,
			edge: edge,
		})
	})
}

function nodeListeners(node, konva_node) {
	// add cursor styling
	konva_node.on('mouseover', function () {
		mouseOnNode = node
		document.body.style.cursor = 'pointer';
	});
	konva_node.on('mouseout', function () {
		mouseOnNode = null
		document.body.style.cursor = 'default';
	});

	konva_node.on('dragmove', function () {
		node.moveText()
		moveEdgesRelatedTo(node, edges)
		layer.draw()
	})

	konva_node.on('click', function () {
		if (shift_pressed) {
			if (node_to_link) {
				node.addParent(node_to_link)
				var edge = new Edge(node_to_link, node)
				edges.push(edge)

				node_to_link = null
				destroyArrow()
			} else {
				node_to_link = node
				drawArrow(node_to_link, stage.getPointerPosition())
			}
			layer.draw()
		}
	})

	konva_node.on('dblclick', function (e) {
		e.cancelBubble = true;
		node.selected = !node.selected
		node.setColor()
		triggerEvent('node-selected', {
			selected: node.selected,
			node: node,
		})
	})
}
