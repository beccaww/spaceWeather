const dps = {
	flr: [],
	sep: [],
	cme: [],
	gst: []
};
var chart;
window.onload = function () {

chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Monthly Space Weather"
	},
	axisX: {
		valueFormatString: "DD MMM,YY"
	},
	axisY: {
		title: "Number of Occurences",
		includeZero: false,
	},
	legend:{
		cursor: "pointer",
		fontSize: 16,
		itemclick: toggleDataSeries
	},
	toolTip:{
		shared: true
	},
	data: [{
		name: "Solar Flare",
		type: "spline",
		yValueFormatString: "#0",
		showInLegend: true,
		dataPoints: dps.flr
	},
	{
		name: "Solar Energetic Particle",
		type: "spline",
		yValueFormatString: "#0",
		showInLegend: true,
		dataPoints: dps.sep
    },
    {
		name: "Coronal Mass Ejection",
		type: "spline",
		yValueFormatString: "#0",
		showInLegend: true,
		dataPoints: dps.cme
	},
	{
		name: "Geomagnetic Storm",
		type: "spline",
		yValueFormatString: "#0",
		showInLegend: true,
		dataPoints: dps.gst
	}]
});
chart.render();

function toggleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else{
		e.dataSeries.visible = true;
	}
	chart.render();
}

}

