var proba_table = document.getElementById("proba-table")

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
	UIkit.slider(slider).show(3);
	proba_table.innerHTML = "<div uk-spinner></div>"

	let nodes_copy = JSON.parse(JSON.stringify(nodes))
	let [nodes_to_treat, nodes_attributed] = splitNodesAttributed(nodes_copy)

	let nodes_values = new Array(nodes_to_treat.length)
	nodes_values.fill(0)

	let val = 0
	while (nodes_values) {
		val += computeProba(nodes_to_treat, nodes_values, nodes_attributed)
		nodes_values = increment(nodes_values)
	}

	let computed_proba = []
	for (let node of nodes_to_treat) {
		computed_proba.push(node.proba_computed / val)
	}

	displayResult(computed_proba, nodes_to_treat, nodes_attributed)
}

function displayResult(computed_proba, nodes_to_treat, nodes_attributed) {
	let html_text = `
	<table class="uk-table uk-table-small uk-table-divider uk-overflow-auto uk-text-justify">
		<thead>
			<tr>
				<th style="text-align:center !important">Name</th>
				<th style="text-align:center !important">0</th>
				<th style="text-align:center !important">1</th>
			</tr>
		</thead>
		<tbody>`

	let attributed = ""
	for (let node of nodes_attributed) {
		attributed += node.name + "=" + node.value + ", "
	}

	if (nodes_attributed.length)
		attributed = attributed.substring(0, attributed.length - 2);

	for (let index in computed_proba) {
		html_text += `
		<tr>
			<td>P(${nodes_to_treat[index].name} | ${attributed})</td>
			<td>${parseFloat((1 - computed_proba[index]).toFixed(3))}</td>
			<td>${parseFloat(computed_proba[index].toFixed(3))}</td>
		</tr>
		`
	}

	html_text += `
		</tbody>
	</table>
	`

	proba_table.innerHTML = html_text
}
