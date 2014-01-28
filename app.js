var ph = new PlotCanvas();
var CWIDTH = 1280;
var CHEIGHT = 480;

$(function() {	
	init();
	console.log("Ok, this is working.");
})

init = function() {
	var canvas = document.getElementById("plot-canvas");
	canvas.width = CWIDTH;
	canvas.height = CHEIGHT;
	ph.setCanvas(canvas);

	$('#clear-plot-button').on('click', function() {
		ph.clearPlot();
	});
}