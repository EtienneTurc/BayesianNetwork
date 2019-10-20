canvas.addEventListener('dblclick', function (e) {
	let n = new Node(e.clientX, e.clientY)
	nodes.push(n)
	draw()
});

canvas.addEventListener('click', function (e) {
	if (!e.shiftKey) {
		link = []
	}

	let node_selected = isOnNodes(e.clientX, e.clientY, nodes)
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



canvas.addEventListener('mousemove', function (e) {
	if (e.shiftKey) {
		return
	}

	for (let n of nodes) {
		if (n.dragged) {
			n.setPos(e.clientX, e.clientY)
		}
	}
	draw()
});


canvas.addEventListener('mousedown', function (e) {
	console.log("hi")
	if (e.shiftKey) {
		return
	}

	let node_selected = isOnNodes(e.clientX, e.clientY, nodes)
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
	draw()
});