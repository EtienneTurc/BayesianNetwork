canvas.addEventListener('dblclick', function (e) {
	let mouse_pos = getMousePosition(e)
	let node_selected = isOnNodes(mouse_pos.x, mouse_pos.y, nodes)
	let edge_selected = isOnEdges(mouse_pos.x, mouse_pos.y, edges)

	for (let n of nodes) {
		if (node_selected == n) {
			n.selected = !n.selected
		} else {
			n.selected = false
		}
	}

	for (let e of edges) {
		if (edge_selected == e && !node_selected) {
			e.selected = !e.selected
		} else {
			e.selected = false
		}
	}

	if (!node_selected && !edge_selected) {
		let n = new Node(mouse_pos.x, mouse_pos.y)
		nodes.push(n)
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
			link = []
			edges.push(edge)
			draw();
		}
	}
});

window.addEventListener('keydown', function (e) {
	if (e.keyCode == BACKSPACE || e.keyCode == DELETE) {
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
