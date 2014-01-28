// Constructor
var AUTO_AXIS_Y_NUM = 5;

function PlotCanvas() {
	this.canvas = {};
	this.context = {};
	this.plotData = [];
	this.plotAxes = {
		x1:0, 
		x2:1, 
		y1:0, 
		y2:1
	}
	this.plotType = "line";

	this.settings = {
		lineColor: 			"#aaa",
		lineWidth: 			2,
		
		markerColor: 		"#49b",
		markerSize: 		6,
		
		padding : 			0.2,

		axisColor: "#ddd",
		axisWidth: 0.5,
		axisFontColor: "#ddd",
		axisFontSize: "10px",
		axisMode: "hor",
		axisXRes: 1,
		axisYRes: 1
	}
	
}

// --------------------
// Get-Set
// --------------------
PlotCanvas.prototype.setCanvas = function(c) {
	this.canvas = c;
	this.context = c.getContext("2d");
}

PlotCanvas.prototype.setAxes = function(x1,x2,y1,y2) {
	this.plotAxes = {
		x1: x1,
		x2: x2,
		y1: y1,
		y2: y2
	};
}

// --------------------
// Plot elements
// --------------------

PlotCanvas.prototype.drawMarker = function(x, y, axes) {
	this.context.save();
	this.context.fillStyle = this.settings.markerColor;
	this.context.beginPath();
	this.context.arc(Math.round(this.canvas.width*(x-axes.x1)/(axes.x2-axes.x1)), Math.round(this.canvas.height*(1 - (y-axes.y1)/(axes.y2-axes.y1))) , this.settings.markerSize, 0, 2*Math.PI);
	this.context.fill();
	this.context.restore();
}

PlotCanvas.prototype.drawLine = function(p1, p2, axes, type) {
	this.context.save();

	if (type == "plot") {
		this.context.strokeStyle = this.settings.lineColor;
		this.context.lineWidth = this.settings.lineWidth;	
	}
	else if (type == "axis") {
		this.context.strokeStyle = this.settings.axisColor;
		this.context.lineWidth = this.settings.axisWidth;		
	}
	
	
	this.context.beginPath();
	this.context.moveTo(Math.round(this.canvas.width*(p1.x-axes.x1)/(axes.x2-axes.x1)), Math.round(this.canvas.height*(1 - (p1.y-axes.y1)/(axes.y2-axes.y1))));
	this.context.lineTo(Math.round(this.canvas.width*(p2.x-axes.x1)/(axes.x2-axes.x1)), Math.round(this.canvas.height*(1 - (p2.y-axes.y1)/(axes.y2-axes.y1))));
	this.context.stroke();
	this.context.restore();
}

PlotCanvas.prototype.drawBar = function(x, y, width, axes) {

}

PlotCanvas.prototype.drawAxes = function(axes) {
	if (this.settings.axisMode == "xy") {

	}
	else if (this.settings.axisMode =="hor") {
		var Y = this.plotAxes.y1 - (this.plotAxes.y1 % this.settings.axisYRes);
		var p1;
		var p2;

		while(Y < this.plotAxes.y2) {
			p1 = {x: this.plotAxes.x1, y:Y};
			p2 = {x: this.plotAxes.x2, y:Y};
			this.drawLine(p1, p2, this.plotAxes, "axis");

			Y += this.settings.axisYRes;
		}
	}
}

// --------------------
// Plot data
// --------------------

PlotCanvas.prototype.clearPlot = function() {
	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
}

PlotCanvas.prototype.linePlot = function(overrideData) {
	var localData = overrideData || this.data;
	var length = localData.length
	for(var i=0; i<length-1; i++) {
		this.drawLine({x:i, y:localData[i]}, {x:i+1, y:localData[i+1]}, this.plotAxes, "plot");
		this.drawMarker(i, localData[i], this.plotAxes);
	}
	this.drawMarker(length-1, localData[length-1], this.plotAxes);
}

PlotCanvas.prototype.barPlot = function(overrideData) {
	var localData = overrideData || this.data;
}

PlotCanvas.prototype.plot = function(overrideData) {
	var localData = overrideData || this.data;
	this.clearPlot();
	this.drawAxes();
	if (this.plotType == "line") {
		this.linePlot(localData);
	}
	else if (this.plotType == "bar") {
		this.barPlot(localData);
	}
}

PlotCanvas.prototype.autoplot = function(overrideData) {

	var localData = overrideData || this.plotData;

	var ref_x1 = 0;
	var ref_x2 = localData.length-1;
	var ref_y1 = Math.min.apply(null,localData);
	var ref_y2 = Math.max.apply(null,localData);

	if (this.plotType == "bar") {
		ref_y1 = Math.min(y1,0);
		ref_y2 = Math.max(y2,0);
	}

	var x1 = ((ref_x1+ref_x2)/2) + (ref_x1 - ((ref_x1+ref_x2)/2))/(1-this.settings.padding);
	var x2 = ((ref_x1+ref_x2)/2) + (ref_x2 - ((ref_x1+ref_x2)/2))/(1-this.settings.padding);
	var y1 = ((ref_y1+ref_y2)/2) + (ref_y1 - ((ref_y1+ref_y2)/2))/(1-this.settings.padding);
	var y2 = ((ref_y1+ref_y2)/2) + (ref_y2 - ((ref_y1+ref_y2)/2))/(1-this.settings.padding);

	this.setAxes(x1,x2,y1,y2);
	this.settings.axisXRes = 1;
	this.settings.axisYRes = Math.floor((y2-y1)/AUTO_AXIS_Y_NUM)
	this.plot(localData);
}