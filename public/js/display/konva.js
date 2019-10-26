var width = window.innerWidth * 0.6;
var height = window.innerHeight * 0.82;

function newStage(json) {
	stage = new Konva.Stage({
		container: 'container',
		width: width,
		height: height,
		draggable: true
	});

	layer = new Konva.Layer();
	stage.add(layer);

	[nodes, edges] = decipherJson(json)
	layer.draw()
}

newStage()
