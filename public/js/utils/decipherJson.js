function decipherJson(json_file = net) {
	let nodes_json = json_file.nodes
	let nodes = []
	let edges = []
	for (let node of nodes_json) {
		let n = new Node(node.x, node.y, node.name, node.id, node.value)
		nodes.push(n)
	}

	for (let i in nodes) {
		for (let p_index of nodes_json[i].parents) {
			let node = getNodeById(p_index, nodes)
			nodes[i].addParent(node)

			var edge = new Edge(node, nodes[i])
			edges.push(edge)
		}
		nodes[i].proba = nodes_json[i].proba
	}

	return [nodes, edges]
}
