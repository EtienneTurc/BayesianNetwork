canvas.addEventListener('dblclick', function (e) {
	let mouse_pos = getMousePosition(e)
	let node_selected = isOnNodes(mouse_pos.x, mouse_pos.y, nodes)
	let edge_selected = isOnEdges(mouse_pos.x, mouse_pos.y, edges)

	// Selects a node
	for (let i in nodes) {
		let n = nodes[i]
		if (node_selected == n) {
			n.selected = !n.selected
			triggerEvent('node-selected', {
				selected: n.selected,
				node: node_selected,
				index: i
			})
		} else {
			n.selected = false
		}
	}

	// Select an edges
	for (let e of edges) {
		if (edge_selected == e && !node_selected) {
			e.selected = !e.selected
		} else {
			e.selected = false
		}
	}

	// Add node and selects it
	if (!node_selected && !edge_selected) {
		let n = new Node(mouse_pos.x, mouse_pos.y)
		nodes.push(n)

		triggerEvent('node-selected', {
			selected: true,
			node: n,
			index: nodes.length - 1
		})
	}

	draw()
});

canvas.addEventListener('click', function (e) {
	let mouse_pos = getMousePosition(e)
	if (!e.shiftKey) {
		link = []
	}

	let node_selected = isOnNodes(mouse_pos.x, mouse_pos.y, nodes)
	if (!node_selected) {
		return
	}

	if (e.shiftKey) {
		link.push(node_selected)

		if (link.length == 2) {
			var edge = new Edge(link[0], link[1])
			link[1].addParent(link[0])
			link = []
			edges.push(edge)
			draw();
		}
	}
});

window.addEventListener('keydown', function (e) {
	if (e.keyCode == DELETE) {
		let res = deleteSelectedNodes(nodes, edges)
		nodes = res[0]
		edges = res[1]
		draw()
	}
});

canvas.addEventListener('mousemove', function (e) {
	let mouse_pos = getMousePosition(e)

	if (e.shiftKey) {
		return
	}

	for (let n of nodes) {
		if (n.dragged) {
			n.setPos(mouse_pos.x, mouse_pos.y)
		}
	}

	draw()
});


canvas.addEventListener('mousedown', function (e) {
	e.preventDefault()
	let mouse_pos = getMousePosition(e)

	if (e.shiftKey) {
		return
	}

	let node_selected = isOnNodes(mouse_pos.x, mouse_pos.y, nodes)
	if (!node_selected) {
		return
	}
	node_selected.dragged = true
});

canvas.addEventListener('mouseup', function (e) {
	if (e.shiftKey) {
		return
	}

	for (let n of nodes) {
		n.dragged = false
	}
});
