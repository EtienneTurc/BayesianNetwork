var canvas = document.getElementById('canvas');
var rest = document.getElementById('rest');
const ctx = canvas.getContext('2d');

var nodes = []
var edges = []

canvas.height = window.innerHeight;
var link = []

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	canvas.width = window.innerWidth * 0.6; // SOMETHING TO DO BETTER THERE
	draw();
}
resizeCanvas();

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let e of edges) {
		e.drawEdge(ctx)
	}

	for (let n of nodes) {
		n.drawNode(ctx)
	}
}
