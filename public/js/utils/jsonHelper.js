function handleFileLoad(event) {
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

function cipherJson(nodes_to_save) {
	let json_nodes = []
	for (let node of nodes_to_save) {
		let parents_id = node.parents.map(parent => parent.id)
		json_nodes.push({
			id: node.id,
			x: node.konva_node.getX(),
			y: node.konva_node.getY(),
			name: node.name,
			value: node.value,
			parents: parents_id,
			proba: node.proba
		})
	}
	return JSON.stringify({ nodes: json_nodes })
}

function saveToJson() {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cipherJson(nodes)));
	element.setAttribute('download', "net.json");

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
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
