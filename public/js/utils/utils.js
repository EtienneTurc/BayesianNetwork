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
		if (node.konva_node.getX() == parent_node.konva_node.getX() && node.konva_node.getY() == parent_node.konva_node.getY() && node.name == parent_node.name) {
			return i
		}
	}
	return -1
}
