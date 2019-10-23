function computeProba(nodes, nodes_values, nodes_attributed) {
	let val = 1
	for (let i in nodes) {
		let node = nodes[i]
		parent_values = []
		for (let parent of node.parents) {
			if (parent.value >= 0) {
				parent_values.push(parent.value)
			} else {
				let index = getIndexInArray(nodes, parent)
				parent_values.push(nodes_values[index])
			}
		}
		let prob_index = getIndex(parent_values)
		val *= node.proba[prob_index][nodes_values[i]]
	}

	for (let i in nodes_attributed) {
		let node = nodes_attributed[i]
		parent_values = []
		for (let parent of node.parents) {
			if (parent.value >= 0) {
				parent_values.push(parent.value)
			} else {
				let index = getIndexInArray(nodes, parent)
				parent_values.push(nodes_values[index])
			}
		}
		let prob_index = getIndex(parent_values)
		val *= node.proba[prob_index][node.value]
	}

	for (let i in nodes) {
		if (nodes_values[i])
			nodes[i].proba_computed += val
	}

	return val
}

function computeProbaAndUpdate() {
	let nodes_copy = JSON.parse(JSON.stringify(nodes))
	let [nodes_to_treat, nodes_attributed] = splitNodesAttributed(nodes_copy)

	let nodes_values = new Array(nodes_to_treat.length)
	nodes_values.fill(0)

	let val = 0
	while (nodes_values) {
		val += computeProba(nodes_to_treat, nodes_values, nodes_attributed)
		nodes_values = increment(nodes_values)
	}

	for (let node of nodes_to_treat) {
		console.log(node.name, node.proba_computed / val)
	}
	console.log("Val", val)
}
