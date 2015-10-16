// JavaScript Document
dojo.require("esri.map");
dojo.require("esri.graphic");
dojo.require("esri.layers.graphics");
dojo.require("esri.dijit.Popup");
dojo.require("dojo.dnd.Moveable");
dojo.require("esri.tasks.locator");

var map;
var points;
var locator;
var changeExtent = true;

//set lods
var lods = [
			{"level" : 11, "resolution" : 76.4370282850732, "scale" : 288895.277144},
			{"level" : 12, "resolution" : 38.2185141425366, "scale" : 144447.638572},
  			{"level" : 13, "resolution" : 19.1092570712683, "scale" : 72223.819286},
			{"level" : 14, "resolution" : 9.55462853563415, "scale" : 36111.909643},
  			{"level" : 15, "resolution" : 4.77731426794937, "scale" : 18055.954822},
			{"level" : 16, "resolution" : 2.38865713397468, "scale" : 9027.977411}
		];

var initExtent = new esri.geometry.Extent({"xmin":-8283613.726641258,"ymin":4934907.310881619,"xmax":-8185994.330436364,"ymax":5006681.680441302,"spatialReference":{"wkid":102100}});

function initMap(){

	map = new esri.Map("map",{
		slider:false,
		extent:initExtent,
		wrapAround180:true,
		lods:lods
	});

	var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer");
        map.addLayer(basemap);

	var basemapRef = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer");
    	map.addLayer(basemapRef);

	map.addLayer(points,1);

	locator = new esri.tasks.Locator("http://tasks.arcgis.com/ArcGIS/rest/services/WorldLocator/GeocodeServer");

	dojo.connect(locator, "onAddressToLocationsComplete", function(geocodeResults) {
          map.graphics.clear();
          dojo.forEach(geocodeResults, function(geocodeResult, index) {

            var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
							 new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
							 new dojo.Color([200, 50, 50, 0.5]), 8),
							 new dojo.Color([200, 50, 50, 0.9])
			);
            var pointMeters = esri.geometry.geographicToWebMercator(geocodeResult.location);
            var locationGraphic = new esri.Graphic(pointMeters, symbol);

			if(pointMeters.x >= initExtent.xmin && pointMeters.x <= initExtent.xmax && pointMeters.y >= initExtent.ymin && pointMeters.y <= initExtent.ymax){
				map.centerAndZoom(pointMeters,5);
				map.graphics.add(locationGraphic,0);
			}
			else{
				alert("The address you searched is currently outside the area of A Place Matters");
			}
          });
          var ptAttr = geocodeResults[0].attributes;

        });

	dojo.connect(map,"onExtentChange",extentChangeTimer);
	dojo.connect(map,"onExtentChange",movePopup);
	dojo.connect(map,"onMouseDown",setPopupPos);
	dojo.connect(map,"onPan",moveOnDrag);
	dojo.connect(points,"onMouseOver",changeCursor);
	dojo.connect(points,"onMouseOut",cursorOut);
	dojo.connect(points,"onClick",openPopup);
}

dojo.addOnLoad(initMap);
dojo.addOnLoad(makeMoveable);

function changeCursor(event){
	map.setCursor('pointer');
	event.graphic.setSymbol(event.graphic.symbol.setHeight(20).setWidth(20));
}

function cursorOut(event){
	map.setCursor('default');
	event.graphic.setSymbol(event.graphic.symbol.setHeight(15).setWidth(15));
}

function extentChangeTimer(){
	if (changeExtent == true){
		changeExtent = false;
		var t = setTimeout('extentOut()',800);
	}
}

function extentOut(){
	var center = map.extent.getCenter();
	if (center.x < initExtent.xmin && center.y < initExtent.ymin){
		map.centerAt({x:initExtent.xmin,y:initExtent.ymin});
	}
	else if (center.x < initExtent.xmin && center.y > initExtent.ymax){
		map.centerAt({x:initExtent.xmin,y:initExtent.ymax});
	}
	else if (center.x > initExtent.xmax && center.y > initExtent.ymax){
		map.centerAt({x:initExtent.xmax,y:initExtent.ymax});
	}
	else if (center.x > initExtent.xmax && center.y < initExtent.ymin){
		map.centerAt({x:initExtent.xmax,y:initExtent.ymin});
	}
	else if (center.x < initExtent.xmin){
		map.centerAt({x:initExtent.xmin,y:center.y})
	}
	else if (center.x > initExtent.xmax){
		map.centerAt({x:initExtent.xmax,y:center.y})
	}
	else if (center.y > initExtent.ymax){
		map.centerAt({x:center.x,y:initExtent.ymax})
	}
	else if (center.y < initExtent.ymin){
		map.centerAt({x:center.x,y:initExtent.ymin})
	}
	changeExtent = true;
}

function makeMoveable() {
	if ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('Android') != -1)) {
		null;
	}
	else {
		moveable = new dojo.dnd.Moveable(dojo.byId('popup'));
		dojo.connect(moveable,"onMoving", function(){$("#popupArrow").hide()});
	}
}

function zIn(){
	map.setLevel(map.getLevel() + 1);
}

function zOut(){
	map.setLevel(map.getLevel() - 1);
}

function x(){
	alert(map.extent.xmin+"\n"+map.extent.ymin+"\n"+map.extent.xmax+"\n"+map.extent.ymax);
}
