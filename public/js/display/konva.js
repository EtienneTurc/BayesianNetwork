var width = window.innerWidth * 0.6;
var height = window.innerHeight * 0.82;

var stage = new Konva.Stage({
	container: 'container',
	width: width,
	height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

[nodes, edges] = decipherJson()
layer.draw()
