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

	$('#sample-1-button').on('click', function() {
		ph.plotType = "line";
		ph.autoplot([10,30,20,50,40,60,23,72,35,63,74,16])
	});

	$('#sample-2-button').on('click', function() {
		ph.plotType = "line";
		ph.settings.axisYRes = 20;
		ph.setAxes(0, 6, 0, 250)
		ph.plot([12, 59, 212, 153, 50, 70, 190]);
	});

	$('#sample-3-button').on('click', function() {
		ph.plotType = "bar";
		ph.settings.axisYRes = 20;
		ph.setAxes(0, 6, 0, 250)
		ph.plot([12, 59, 212, 153, 50, 70, 190]);
	});

	$('#clear-plot-button').on('click', function() {
		ph.clearPlot();
	});
}