var form = document.getElementById("form")
var container = document.getElementById("container")
var slider = document.getElementById("slider")

container.addEventListener('node-selected', function (e) {
	if (e.detail.selected) {
		UIkit.slider(slider).show(2);

		let node = e.detail.node
		let html_to_inject = `
		<div class="uk-margin">
			<h4 class="uk-heading-line uk-text-center"><span id="node_name" ondblclick="updateName()">${node.name}</span></h4>
		</div>
		<table class="uk-table uk-table-small uk-table-divider uk-overflow-auto">
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
			html_to_inject += `<td><input id="p${i}0" step="0.01" onchange="checkProba(${i}, 0)" class="uk-input" style="text-align:center" type="number" placeholder="Probability" value="${node.proba[i][0]}">
				</td>
				<td><input id="p${i}1" class="uk-input" step="0.01" onchange="checkProba(${i}, 1)" style="text-align:center" type="number" placeholder="Probability" value="${node.proba[i][1]}">
				</td>
			</tr>`
		}
		html_to_inject += `
			</tbody>
		</table>
		<div class="uk-margin">
			<select id="value-attribution" class="uk-select uk-width-1-2">
				<option ${node.value == -1 ? 'selected' : ''} value="-1">Non attributed</option>
				<option ${node.value == 0 ? 'selected' : ''} value="0">0</option>
				<option ${node.value == 1 ? 'selected' : ''} value="1">1</option>
			</select>
		</div>
		<div class="uk-flex uk-flex-center" style="margin-top:20px;">
			<button onclick="saveNode(${node.id})" class="uk-button uk-button-default">Update node</button>
		</div>
		`
		form.innerHTML = html_to_inject
	} else {
		UIkit.slider(slider).show(1);
		form.innerHTML = `
		<div class="uk-margin">
			<h3 class="uk-heading-line uk-text-center"><span><b>No nodes selected</b></span></h3>
		</div>
		`
	}
});

function saveNode(id) {
	let node = getNodeById(id, nodes)
	node.name = document.getElementById("node_name").innerHTML
	if (document.getElementById("node_name_input")) {
		node.name = document.getElementById("node_name_input").value
	}
	for (let i in node.proba) {
		node.proba[i] = [parseFloat(document.getElementById("p" + i.toString() + "0").value), parseFloat(document.getElementById("p" + i.toString() + "1").value)]
	}
	node.value = parseInt(document.getElementById("value-attribution").value)
	node.konva_node_name.setText(node.name)
	layer.draw()
}

function updateName() {
	var span_node_name = document.getElementById("node_name")
	if (document.getElementById("node_name_input")) {
		span_node_name.innerHTML = document.getElementById("node_name_input").value
	} else {
		span_node_name.innerHTML = `
		<input id="node_name_input" class="uk-input" type="text" placeholder="Node name" value="${span_node_name.innerHTML}" autofocus>
		`
	}
}

function checkProba(proba_index, input_index) {
	let current_doc = document.getElementById("p" + proba_index.toString() + input_index.toString())
	let opposite_doc = document.getElementById("p" + proba_index.toString() + (1 - input_index).toString())
	let current_value = parseFloat(current_doc.value)
	let value = Math.max(Math.min(1, current_value), 0)
	current_doc.value = parseFloat(value)
	opposite_doc.value = parseFloat((1 - value).toFixed(10))
}
