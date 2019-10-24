// NODES
function isOnNodes(x, y, nodes) {
	for (let n of nodes) {
		if (n.intersect(x, y)) {
			return n
		}
	}
	return null
}

function getNodeById(id, nodes) {
	for (let node of nodes) {
		if (node.id == id) {
			return node
		}
	}
	return null
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
		n.eraseNode()
		delete n
	}

	for (let n of new_nodes) {
		n.deleteParents(to_delete)
	}

	layer.draw()

	return [new_nodes, new_edges]
}

// EDGES
function isOnEdges(x, y, edges) {
	for (let e of edges) {
		if (e.intersect(x, y)) {
			return e
		}
	}
	return null
}
