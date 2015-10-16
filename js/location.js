// JavaScript Document
var graphic;

$(document).ready(function(){
	if(navigator.geolocation) {
		$(".search_field button").show();
	}
	$("#geoLocImg").click(function(){
		document.getElementById('geoLocImg').src = 'images/geoWorking.gif';
	});
});

function locate(){
	if(navigator.geolocation) {
		explore = false;
		navigator.geolocation.getCurrentPosition(function(pos){
			var latitude = pos.coords.latitude;
			var longitude = pos.coords.longitude;
			loc = esri.geometry.geographicToWebMercator(new esri.geometry.Point(longitude,latitude));
			if(loc.x >= initExtent.xmin && loc.x <= initExtent.xmax && loc.y >= initExtent.ymin && loc.y <= initExtent.ymax){
				map.centerAndZoom(loc,5);
				var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12, 
							 new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
							 new dojo.Color([200, 50, 50, 0.5]), 8), 
							 new dojo.Color([200, 50, 50, 0.9])
				);
				graphic = new esri.Graphic(loc, symbol);
				map.graphics.clear();
				map.graphics.add(graphic);
			}
			else{
				alert("You are currently outside the area of Place Matters");
			}
			document.getElementById('geoLocImg').src = 'images/geolocation_icon.png';
		},locError);
	}
}

function locError(error){
	switch(error.code){
      case error.PERMISSION_DENIED: alert("Location not provided");
      break;
      case error.POSITION_UNAVAILABLE: alert("Current location not available");
      break;
      case error.TIMEOUT: alert("Geolocation Timeout");
      break;
      default: alert("Unknown Error");
      break;
    }
	document.getElementById('geoLocImg').src = 'images/geolocation_icon.png';
}

function searchAdd(event){
	if(event.keyCode == 13){
		var address = {'SingleLine': document.getElementById('search').value};
        locator.addressToLocations(address,["*"]);
	}
}

function findSite(event){
	censusSite = false;
	if(event.keyCode == 13){
		if(document.getElementById('search').value != 'Address, neighborhood, or place' && document.getElementById('search').value != ""){
			for(i=0;i<points.graphics.length;i++){
				if(points.graphics[i].attributes.name == document.getElementById('search').value){
					map.centerAndZoom(points.graphics[i].geometry,5);
					$('#popupTitle').html(points.graphics[i].attributes.name);
					$('#description').html(points.graphics[i].attributes.description);
					$('#pageLink').attr('href',points.graphics[i].attributes.url);
					if(points.graphics[i].attributes.imgUrl == null){
						$('#siteImg').hide();
					}
					else{
						$('#siteImg').attr('src',points.graphics[i].attributes.imgUrl);
						$('#siteImg').show();
					}
					var height = $('#popup').height();
					var x = map.toScreen(map.extent.getCenter());
					var y = map.toScreen(map.extent.getCenter());
					$('#popupArrow').attr('src','images/popupArrowSW.png');
					$('#popupArrow').css('left',x.x+'px');
					$('#popupArrow').css('top',y.y-44+'px');
					$('#popup').css('left',x.x+'px');
					$('#popup').css('top',y.y-height-40+'px');
					$('#popupArrow').show();
					$('#popup').show();
					censusSite = true;
				}
			}
		}
		if (censusSite == false){
			var address = {'SingleLine': document.getElementById('search').value};
        	locator.addressToLocations(address,["*"]);
		}
		censusSite = false;
	}
}

function findSiteSearch(){
	censusSite = false;
		if(document.getElementById('search').value != 'Address, neighborhood, or place' && document.getElementById('search').value != ""){
			for(i=0;i<points.graphics.length;i++){
				if(points.graphics[i].attributes.name == document.getElementById('search').value){
					map.centerAndZoom(points.graphics[i].geometry,5);
					$('#popupTitle').html(points.graphics[i].attributes.name);
					$('#description').html(points.graphics[i].attributes.description);
					$('#pageLink').attr('href',points.graphics[i].attributes.url);
					if(points.graphics[i].attributes.imgUrl == null){
						$('#siteImg').hide();
					}
					else{
						$('#siteImg').attr('src',points.graphics[i].attributes.imgUrl);
						$('#siteImg').show();
					}
					var height = $('#popup').height();
					var x = map.toScreen(map.extent.getCenter());
					var y = map.toScreen(map.extent.getCenter());
					$('#popupArrow').attr('src','images/popupArrowSW.png');
					$('#popupArrow').css('left',x.x+'px');
					$('#popupArrow').css('top',y.y-44+'px');
					$('#popup').css('left',x.x+'px');
					$('#popup').css('top',y.y-height-40+'px');
					$('#popupArrow').show();
					$('#popup').show();
					censusSite = true;
				}
			}
		if (censusSite == false){
			var address = {'SingleLine': document.getElementById('search').value};
        	locator.addressToLocations(address,["*"]);
		}
		censusSite = false;
	}
}