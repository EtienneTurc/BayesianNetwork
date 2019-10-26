function handleFileLoad(event) {
	console.log("hi")
	var json_content = event.target.result;
	newStage(JSON.parse(json_content))
	document.getElementById("close-modal").click()
}

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
		nodes[i].selected = false
		nodes[i].setColor()
	}

	return [nodes, edges]
}

function saveToJson() {
	console.log("hi")
}


UIkit.upload('.js-upload', {
	url: '',
	multiple: false,
	mime: "*/json",
	allow: "*.json",

	beforeAll: function () {
		const reader = new FileReader()
		reader.onload = handleFileLoad;
		reader.readAsText(arguments[1][0])
	},
});
