function triggerEvent(event_name, data) {
	var event = new CustomEvent(event_name, { 'detail': data })
	container.dispatchEvent(event)
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

function getIndexInArray(nodes, parent_node) {
	for (let i in nodes) {
		let node = nodes[i]
		if (node.id == parent_node.id) {
			return i
		}
	}
	return -1
}

function outerNode(edge) {
	let vec = [edge[2] - edge[0], edge[3] - edge[1]]
	let norm = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1])
	vec[0] /= norm
	vec[1] /= norm

	edge[2] -= vec[0] * NODE_RADIUS
	edge[3] -= vec[1] * NODE_RADIUS

	return edge
}
