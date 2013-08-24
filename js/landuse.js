$(document).ready(function () {

	// Tile layer needs
	var OSMUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var OSMAttribution = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';

	// Tile layers
	var baseTile = L.tileLayer(OSMUrl, {
		maxZoom: 18,
		attribution: OSMAttribution 
	});

	// Map
	var map = L.map('map', {
		center: new L.LatLng(37.44, 15.14), 
		zoom: 11,
		layers: [baseTile]
	});

	var geojsonLayer = null;


	var popup = L.popup();

	function onMapClick(e) {
	    popup
		.setLatLng(e.latlng)
		.setContent(e.latlng.toString())
		.openOn(map);
	}

	map.on('click', onMapClick);

	function getColor(cod) {
	    return cod == 111 ? 'rgb(205,0,61)' : //0
		   cod == 112  ? 'rgb(212,71,139)' :
		   cod == 121  ? 'rgb(153,20,101)' :
		   cod == 122  ? 'rgb(239,119,71)' :
		   cod == 123   ? 'rgb(69,48,143)' :
		   cod == 124   ? 'rgb(117,53,90)' :
		   cod == 131   ? 'rgb(255,255,255)' :
		   cod == 133   ? 'rgb(169,176,169)' :
		   cod == 211   ? 'rgb(242,232,135)' :
		   cod == '211o'   ? 'rgb(244,234,137)' : 
		   cod == 221   ? 'rgb(205,39,1)' : //10
		   cod == 226   ? 'rgb(243,207,131)' :
		   cod == 231   ? 'rgb(250,201,0)' :
		   cod == 314   ? 'rgb(208,224,148)' :
		   cod == 321   ? 'rgb(163,185,25)' :
		   cod == 322   ? 'rgb(186,202,18)' :
		   cod == 323   ? 'rgb(204,204,103)' :
		   cod == 331   ? 'rgb(148,115,35)' :
		   cod == 333   ? 'rgb(241,244,227)' : //18
			      '#000000';
	}

	function landuseStyle(feature) {
	    return {
		fillColor: getColor(feature.properties.COD_USO),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	    };
	}

	function zoomToFeature(e) {
	    map.fitBounds(e.target.getBounds());
	}

	var info = L.control();

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	    this.update();
	    return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function (props) {
	    this._div.innerHTML = '<h4>Land use classification</h4>' +  (props ?
		'<b>' + props.CLASS + '</b><br />Code: ' + props.COD_USO 
		: 'Hover over a region');
	};

	info.addTo(map);

	function highlightFeature(e) {
	    var layer = e.target;

	    layer.setStyle({
		weight: 2,
		color: '#5949E9',
		dashArray: '',
		fillOpacity: 0.9
	    });

	    if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	    }
	    info.update(layer.feature.properties);
	}

	function resetHighlight(e) {
    		geojsonLayer.resetStyle(e.target);
		info.update();
	}

	function onEachFeature(feature, layer) {
	    layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	    });
	}

	$.getJSON("js/land_use_catania.json", function(data) {
		//When GeoJSON is loaded
		geojsonLayer = new L.GeoJSON(data, {
		style: landuseStyle,
		onEachFeature: onEachFeature
		});	
		geojsonLayer.addTo(map);

	});

});
