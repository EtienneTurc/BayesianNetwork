var form = document.getElementById("form")
var container = document.getElementById("container")

container.addEventListener('node-selected', function (e) {
	if (e.detail.selected) {
		let node = e.detail.node
		let html_to_inject = `
		<div class="uk-margin">
			<input id="node_name" class="uk-input" type="text" placeholder="Node name" value="${node.name}">
		</div>
		<table class="uk-table uk-table-small uk-table-divider">
			<thead>
				<tr>`

		for (let parent of node.parents) {
			html_to_inject += `<th>${parent.name}</th>`
		}
		html_to_inject += `
					<th>P(Node = 0${node.parents.length ? '| Parents' : ''})</th>
					<th>P(Node = 1${node.parents.length ? '| Parents' : ''})</th>
				</tr>
			</thead>
			<tbody>
		`
		for (let i in node.proba) {
			html_to_inject += `<tr>`
			for (let index in node.parents) {
				html_to_inject += `<td>${parseInt(i / Math.pow(2, index)) % 2}</td>`
			}
			html_to_inject += `<td><input id="p${i}0" class="uk-input" type="text" placeholder="Probability" value="${node.proba[i][0]}">
				</td>
				<td><input id="p${i}1" class="uk-input" type="text" placeholder="Probability" value="${node.proba[i][1]}">
				</td>
			</tr>`
		}
		html_to_inject += `
			</tbody>
		</table>
		<div class="uk-margin">
			<select id="value-attribution" class="uk-select">
				<option ${node.value == -1 ? 'selected' : ''} value="-1">Non attributed</option>
				<option ${node.value == 0 ? 'selected' : ''} value="0">0</option>
				<option ${node.value == 1 ? 'selected' : ''} value="1">1</option>
			</select>
		</div>
		<button onclick="saveNode(${node.id})" class="uk-button uk-button-default">Save</button>
		<button onclick="computeProbaAndUpdate()" class="uk-button uk-button-default">Compute</button>`
		form.innerHTML = html_to_inject
	} else {
		form.innerHTML = "Nothing to display"
	}
});

function saveNode(id) {
	let node = getNodeById(id, nodes)
	node.name = document.getElementById("node_name").value
	for (let i in node.proba) {
		node.proba[i] = [parseFloat(document.getElementById("p" + i.toString() + "0").value), parseFloat(document.getElementById("p" + i.toString() + "1").value)]
	}
	node.value = parseInt(document.getElementById("value-attribution").value)
	node.konva_node_name.setText(node.name)
	layer.draw()
}
