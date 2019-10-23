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
	return {
		x: e.clientX,
		y: e.clientY
	}
}

function splitNodes(nodes) {
	nodes_to_treat = []
	nodes_remaining = []
	for (let n of nodes) {
		if (!n.parents.length) {
			nodes_to_treat.push(n)
		} else {
			let remaining = false
			for (let parent of n.parents) {
				if (parent.value == -1) {
					remaining = true
					nodes_remaining.push(n)
					break
				}
			}
			if (!remaining)
				nodes_to_treat.push(n)
		}
	}
	return [nodes_to_treat, nodes_remaining]
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

	for (let n of new_nodes) {
		n.deleteParents(to_delete)
	}

	return [new_nodes, new_edges]
}

function triggerEvent(event_name, data) {
	var event = new CustomEvent(event_name, { 'detail': data })
	canvas.dispatchEvent(event)
}

function getIndex(values) {
	index = 0
	power = 1
	for (let value of values) {
		index += value * power
		power *= 2
	}
	return index
}

function increment(values) {
	for (let i in values) {
		if (values[i] == 0) {
			values[i] = 1
			return values
		} else {
			values[i] = 0
		}
	}
	return false
}

function splitNodesAttributed(nodes) {
	let nodes_to_treat = []
	let nodes_attributed = []

	for (let n of nodes) {
		if (n.value == -1) {
			nodes_to_treat.push(n)
		} else {
			nodes_attributed.push(n)
		}
	}

	return [nodes_to_treat, nodes_attributed]
}

function getIndexInArray(nodes, parent_node) {
	for (let i in nodes) {
		let node = nodes[i]
		if (node.x == parent_node.x && node.y == parent_node.y && node.name == parent_node.name) {
			return i
		}
	}
	return -1
}
