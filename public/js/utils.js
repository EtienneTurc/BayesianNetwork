function isOnNodes(x, y, nodes) {
	for (let n of nodes) {
		if (n.intersect(x, y)) {
			return n
		}
	}
	return null
}

function isOnEdges(x, y, edges) {
	for (let e of edges) {
		if (e.intersect(x, y)) {
			return e
		}
	}
	return null
}

function getMousePosition(e) {
	var rect = canvas.getBoundingClientRect();

	return {
		x: e.clientX,
		y: e.clientY
	}
}

function deleteSelectedNodes(nodes, edges) {
	let to_delete = []
	let new_nodes = []
	for (let n of nodes) {
		if (n.selected) {
			to_delete.push(n)
		} else {
			new_nodes.push(n)
		}
	}
	let new_edges = []
	for (let e of edges) {
		if (e.selected) {
			delete e
			continue
		}
		if (!to_delete.includes(e.node1) && !to_delete.includes(e.node2)) {
			new_edges.push(e)
		}
	}
	for (let n of to_delete) {
		delete n
	}
	return [new_nodes, new_edges]
}
