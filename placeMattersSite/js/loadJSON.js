// JavaScript Document
var places = [];
var points = new esri.layers.GraphicsLayer();

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.open("GET","PlaceCensus.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 

var x=xmlDoc.getElementsByTagName("Place");
for (i=0;i<x.length;i++){
	if(x[i].getElementsByTagName("ID").length > 0 && x[i].getElementsByTagName("Name").length > 0 && x[i].getElementsByTagName("Description").length > 0 && x[i].getElementsByTagName("PhysicalTypes").length > 0 && x[i].getElementsByTagName("Latitude").length > 0 && x[i].getElementsByTagName("Longitude").length > 0 && x[i].getElementsByTagName("WebpageUrl").length > 0 && x[i].getElementsByTagName("Uses").length > 0){
		place = {"id":x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue,
				 "name":x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue,
				 "description":x[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue,
				 "physicalType":x[i].getElementsByTagName("PhysicalTypes")[0].childNodes[0].nodeValue,
				 "url":x[i].getElementsByTagName("WebpageUrl")[0].childNodes[0].nodeValue,
				 "uses":x[i].getElementsByTagName("Uses")[0].childNodes[0].nodeValue,
				 "latitude":x[i].getElementsByTagName("Latitude")[0].childNodes[0].nodeValue,
				 "longitude":x[i].getElementsByTagName("Longitude")[0].childNodes[0].nodeValue}	 
		if(x[i].getElementsByTagName("ImageUrl").length > 0){
			place.imgUrl = x[i].getElementsByTagName("ImageUrl")[0].childNodes[0].nodeValue;
		}
		
		places.push(place);
	}
  }

for (i=0;i<places.length;i++){
	
		var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(places[i].longitude,places[i].latitude));
	
		
				
		var attr = {"id":places[i].id,
				    "name":places[i].name,
				    "description":places[i].description,
				    "physicalType":places[i].physicalType,
				    "uses":places[i].uses,
				    "url":places[i].url,
				    "imgUrl":places[i].imgUrl,
				    "latitude":places[i].latitude,
				    "longitude":places[i].longitude}
		
		if (attr.physicalType == 'Residential'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/residential.png', 15, 15);
		}
		else if (attr.physicalType == 'Public Art'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/publicArt.png', 15, 15);
		}
		else if (attr.physicalType == 'Industrial'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/industrial.png', 15, 15);
		}
		else if (attr.physicalType == 'Commercial'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/commercial.png', 15, 15);
		}
		else if (attr.physicalType == 'Infrastructure'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/infrastructure.png', 15, 15);
		}
		else if (attr.physicalType == 'Roadway/Sidewalk'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/roadway.png', 15, 15);
		}
		else if (attr.physicalType == 'Parks & Gardens'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/parks.png', 15, 15);
		}
		else if (attr.physicalType == 'Institution'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/institution.png', 15, 15);
		}
		else if (attr.physicalType == 'Theatre'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/theatre.png', 15, 15);
		}
		else if (attr.physicalType == 'Open Space'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/open.png', 15, 15);
		}
		else if (attr.physicalType == 'Burial Site'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/burial.png', 15, 15);
		}
		else if (attr.physicalType == 'Market'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/market.png', 15, 15);
		}
		else if (attr.physicalType == 'Office Building'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/office.png', 15, 15);
		}
		else if (attr.physicalType == 'Pools'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/pool.png', 15, 15);;
		}
		else if (attr.physicalType == 'Public Hall'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/publicHall.png', 15, 15);
		}
		else if (attr.physicalType == 'Featured'){				
			sym = new esri.symbol.PictureMarkerSymbol('images/icons/featured.png', 15, 15);
		}
		else {				
			sym = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
				  new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
				  new dojo.Color([100,100,100]), 0.2),
				  new dojo.Color([137,137,137,0.85]));
		}
		
			
		points.add(new esri.Graphic(pt,sym,attr));		
}
$(function() {
		var data = [];
		for(i=0;i<places.length;i++){
			dataField = { label: places[i].name, category: places[i].physicalType };
			data.push(dataField);
		};
		data.sort(function(a,b){
			var catA = a.category
			var catB = b.category
			if(catA < catB){
				return -1
			}
			if (catA > catB){
				return 1
			}
			else{
				return 0
			}
		});
		
		$( "#search" ).catcomplete({
			delay: 0,
			source: data,
			select: function(){
				var t = setTimeout("findSiteSearch()",10)
			}
		});
	});