stage.on('dblclick', function (e) {
	let mouse_pos = stage.getPointerPosition()
	let node = new Node(mouse_pos.x, mouse_pos.y)
	nodes.push(node)

	triggerEvent('node-selected', {
		selected: true,
		node: node,
	})

	layer.draw()
})

container.addEventListener('node-selected', function (e) {
	for (let node of nodes) {
		if (node.id != e.detail.node.id) {
			node.selected = false
			node.setColor(NODE_BACKGROUND_COLOR)
		}
	}
	layer.draw()
})

container.addEventListener('click', function (e) {
	let mouse_pos = stage.getPointerPosition()
	if (!e.shiftKey) {
		link = []
	}

	let node_selected = isOnNodes(mouse_pos.x, mouse_pos.y, nodes)
	if (!node_selected) {
		return
	}

	if (e.shiftKey) {
		link.push(node_selected)
		node_selected.linked = true

		if (link.length == 2) {
			var edge = new Edge(link[0], link[1])
			link[1].addParent(link[0])
			link[0].linked = false
			link[1].linked = false
			link = []
			edges.push(edge)
		}
	}
});

window.addEventListener('keydown', function (e) {
	if (e.keyCode == DELETE) {
		let res = deleteSelectedNodes(nodes, edges)
		nodes = res[0]
		edges = res[1]
	}
});


function nodeListeners(node, konva_node) {
	// add cursor styling
	konva_node.on('mouseover', function () {
		document.body.style.cursor = 'pointer';
	});
	konva_node.on('mouseout', function () {
		document.body.style.cursor = 'default';
	});

	konva_node.on('dragmove', function () {
		node.moveText()
		layer.draw()
	})

	konva_node.on('dblclick', function (e) {
		e.cancelBubble = true;
		node.selected = !node.selected
		node.setColor(node.selected ? NODE_BACKGROUND_COLOR_SELECTED : NODE_BACKGROUND_COLOR)
		triggerEvent('node-selected', {
			selected: node.selected,
			node: node,
		})
	})
}
