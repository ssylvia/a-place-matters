// JavaScript Document
var places = [];
var points = new esri.layers.GraphicsLayer();

for(i=0;i<loc.dataroot.PlaceCensus_Update.length;i++){
	if(loc.dataroot.PlaceCensus_Update[i].ID != null && loc.dataroot.PlaceCensus_Update[i].Name != null && loc.dataroot.PlaceCensus_Update[i].Description != null && loc.dataroot.PlaceCensus_Update[i].Physical_x0020_types != null && loc.dataroot.PlaceCensus_Update[i].Uses != null && loc.dataroot.PlaceCensus_Update[i].Webpage_x0020_Url != null && loc.dataroot.PlaceCensus_Update[i].Lat != null && loc.dataroot.PlaceCensus_Update[i].Long != null){
		place = {"id":loc.dataroot.PlaceCensus_Update[i].ID,
				 "name":loc.dataroot.PlaceCensus_Update[i].Name,
				 "description":loc.dataroot.PlaceCensus_Update[i].Description,
				 "physicalType":loc.dataroot.PlaceCensus_Update[i].Physical_x0020_types,
				 "uses":loc.dataroot.PlaceCensus_Update[i].Uses,
				 "url":loc.dataroot.PlaceCensus_Update[i].Webpage_x0020_Url,
				 "imgUrl":loc.dataroot.PlaceCensus_Update[i].Image_x0020_Url,
				 "latitude":loc.dataroot.PlaceCensus_Update[i].Lat,
				 "longitude":loc.dataroot.PlaceCensus_Update[i].Long}
		
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