// JavaScript Document

popupPos = [];

$(document).ready(function(){
	$("#modalBackground").fadeTo('slow',0.9);
	$("#introCon1").fadeIn('fast');
	$("#continue").click(function (){
		$("#modalBackground").fadeOut('slow');
		$("#introCon1").fadeOut('slow');
	});
	$("#topPanel").fadeTo('slow','0.85');
	$("#legend").fadeTo('slow','0.85');
	legTop = $("#topPanel").height();
	$("#legend").css('top',legTop+20);
	$("#LegText").click(function(){
		toggleLeg();
	});
	$("#zoomIn").mouseover(function(e) {
        $("#zoomIn").attr('src','images/zoomOver.png');
    });
	$("#zoomOut").mouseover(function(e) {
        $("#zoomOut").attr('src','images/zoomOutOver.png');
    });
	$("#zoomIn").mouseout(function(e) {
        $("#zoomIn").attr('src','images/zoom.png');
    });
	$("#zoomOut").mouseout(function(e) {
        $("#zoomOut").attr('src','images/zoomOut.png');
    });
});

$(window).resize(function(){
	map.resize();
});

function toggleLeg(){
	if($("#legend").is(':hidden')){
		$("#legend").slideDown();
		$('#LegText').html('L E G E N D ▲');
	}
	else{
		$("#legend").slideUp();
		$('#LegText').html('L E G E N D ▼');
	}
}

$.widget( "custom.catcomplete", $.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
			var self = this,
			currentCategory = "";
			$.each( items, function( index, item ) {
			if ( item.category != currentCategory ) {
				ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
				currentCategory = item.category;
			}
			self._renderItem( ul, item );
		});
	}
});

function clearField(){
	$('#search').val("");
	$('#search').css('font-style','normal');
	map.graphics.clear();
}

function addValue(){
	var t = setTimeout("addText()",4000);
}

function addText(){
	$('#search').val("Address, neighborhood, or place");
	$('#search').css('font-style','italic');
}

function openPopup(event){
	$('#popupTitle').html(event.graphic.attributes.name);
	$('#description').html(event.graphic.attributes.description);
	$('#pageLink').attr('href',event.graphic.attributes.url);
	if(event.graphic.attributes.imgUrl == null){
		$('#siteImg').hide();
	}
	else{
		$('#siteImg').attr('src',event.graphic.attributes.imgUrl);
		$('#siteImg').show();
	}
	var height = $('#popup').height();
	var x = map.toScreen(event.graphic.geometry).x;
	var y = map.toScreen(event.graphic.geometry).y;
	var mapCen = map.extent.getCenter();
	if($("#popup").is(":visible") && $("#popupArrow").is(":visible")){
		if (event.graphic.geometry.x <= mapCen.x && event.graphic.geometry.y <= mapCen.y){
			$('#popupArrow').attr('src','images/popupArrowSW.png');
			$('#popupArrow').css('left',x+'px');
			$('#popupArrow').css('top',y-45+'px');
			$('#popup').css('left',x+'px');
			$('#popup').css('top',y-height-40+'px');
		}
		else if (event.graphic.geometry.x > mapCen.x && event.graphic.geometry.y <= mapCen.y){
			$('#popupArrow').attr('src','images/popupArrowSE.png');
			$('#popupArrow').css('left',x-60+'px');
			$('#popupArrow').css('top',y-45+'px');
			$('#popup').css('left',x-250+'px');
			$('#popup').css('top',y-height-40+'px');
		}
		else if (event.graphic.geometry.x > mapCen.x && event.graphic.geometry.y > mapCen.y){
			$('#popupArrow').attr('src','images/popupArrowNE.png');
			$('#popupArrow').css('left',x-60+'px');
			$('#popupArrow').css('top',y+5+'px');
			$('#popup').css('left',x-250+'px');
			$('#popup').css('top',y+40+'px');
		}
		else if (event.graphic.geometry.x <= mapCen.x && event.graphic.geometry.y > mapCen.y){
			$('#popupArrow').attr('src','images/popupArrowNW.png');
			$('#popupArrow').css('left',x+'px');
			$('#popupArrow').css('top',y+5+'px');
			$('#popup').css('left',x+'px');
			$('#popup').css('top',y+40+'px');
		}
		$('#popupArrow').show();
		$('#popup').show();
	}
	else if($("#popup").is(":hidden") && $("#popupArrow").is(":hidden")){
		if (event.graphic.geometry.x <= mapCen.x && event.graphic.geometry.y <= mapCen.y){
			$('#popupArrow').attr('src','images/popupArrowSW.png');
			$('#popupArrow').css('left',x+'px');
			$('#popupArrow').css('top',y-45+'px');
			$('#popup').css('left',x+'px');
			$('#popup').css('top',y-height-40+'px');
		}
		else if (event.graphic.geometry.x > mapCen.x && event.graphic.geometry.y <= mapCen.y){
			$('#popupArrow').attr('src','images/popupArrowSE.png');
			$('#popupArrow').css('left',x-60+'px');
			$('#popupArrow').css('top',y-45+'px');
			$('#popup').css('left',x-250+'px');
			$('#popup').css('top',y-height-40+'px');
		}
		else if (event.graphic.geometry.x > mapCen.x && event.graphic.geometry.y > mapCen.y){
			$('#popupArrow').attr('src','images/popupArrowNE.png');
			$('#popupArrow').css('left',x-60+'px');
			$('#popupArrow').css('top',y+5+'px');
			$('#popup').css('left',x-250+'px');
			$('#popup').css('top',y+40+'px');
		}
		else if (event.graphic.geometry.x <= mapCen.x && event.graphic.geometry.y > mapCen.y){
			$('#popupArrow').attr('src','images/popupArrowNW.png');
			$('#popupArrow').css('left',x+'px');
			$('#popupArrow').css('top',y+5+'px');
			$('#popup').css('left',x+'px');
			$('#popup').css('top',y+40+'px');
		}
		$('#popupArrow').show();
		$('#popup').show();
	}
	$("#siteImg").load(function(e) {
    	movePopup();
	});
}

function zoomTo(){
	name = $('#popupTitle').html();
	esName = name.replace('&amp;','&');
	for (i=0;i<places.length;i++){
		if(places[i].name == esName){
			var zmTo = esri.geometry.geographicToWebMercator(new esri.geometry.Point(places[i].longitude,places[i].latitude));
			if(map.getLevel() != 5 || map.extent.getCenter().x != zmTo.x && map.extent.getCenter().y != zmTo.y){
				var x = map.toScreen(map.extent.getCenter());
				var y = map.toScreen(map.extent.getCenter());
				if (map.getLevel() == 5){
					map.centerAt(zmTo);
				}
				else{
					map.centerAndZoom(zmTo,5);
				}
				if($("#popup").is(":visible") && $("#popupArrow").is(":visible")){
					var height = $('#popup').height();
					$('#popupArrow').attr('src','images/popupArrowSW.png');
					$('#popupArrow').css('left',x.x+'px');
					$('#popupArrow').css('top',y.y-45+'px');
					$('#popup').css('left',x.x+'px');
					$('#popup').css('top',y.y-height-40+'px');
					$('#popupArrow').show();
				}
			}
		}
	}
}

function closePopup(){
	$('#popupArrow').css('display','none');
	$('#popup').css('display','none');
}

function movePopup(){
	if($("#popup").is(":visible") && $("#popupArrow").is(":visible")){
		name = $('#popupTitle').html();
		esName = name.replace('&amp;','&');
		for(i=0;i<points.graphics.length;i++){
			if(points.graphics[i].attributes.name == esName){
				var popupPt = map.toScreen(points.graphics[i].geometry);
				var mapCen = map.toScreen(map.extent.getCenter());
				var height = $('#popup').height();
				if (popupPt.x <= mapCen.x && popupPt.y >= mapCen.y){
					$('#popupArrow').attr('src','images/popupArrowSW.png');
					$('#popupArrow').css('left',popupPt.x+'px');
					$('#popupArrow').css('top',popupPt.y-45+'px');
					$('#popup').css('left',popupPt.x+'px');
					$('#popup').css('top',popupPt.y-height-40+'px');
				}
				else if (popupPt.x > mapCen.x && popupPt.y >= mapCen.y){
					$('#popupArrow').attr('src','images/popupArrowSE.png');
					$('#popupArrow').css('left',popupPt.x-60+'px');
					$('#popupArrow').css('top',popupPt.y-45+'px');
					$('#popup').css('left',popupPt.x-250+'px');
					$('#popup').css('top',popupPt.y-height-40+'px');
				}
				else if (popupPt.x > mapCen.x && popupPt.y < mapCen.y){
					$('#popupArrow').attr('src','images/popupArrowNE.png');
					$('#popupArrow').css('left',popupPt.x-60+'px');
					$('#popupArrow').css('top',popupPt.y+5+'px');
					$('#popup').css('left',popupPt.x-250+'px');
					$('#popup').css('top',popupPt.y+40+'px');
				}
				else if (popupPt.x <= mapCen.x && popupPt.y < mapCen.y){
					$('#popupArrow').attr('src','images/popupArrowNW.png');
					$('#popupArrow').css('left',popupPt.x+'px');
					$('#popupArrow').css('top',popupPt.y+5+'px');
					$('#popup').css('left',popupPt.x+'px');
					$('#popup').css('top',popupPt.y+40+'px');
				}
				if($("#popup").is(":visible")){
					$('#popupArrow').show();
				}
			}
		}
	}
}

function setPopupPos(){
	popupPos = [];
	var arrPos = $("#popupArrow").position();
	var popPos = $("#popup").position();
	var pos = {arrow:arrPos,popup:popPos};
	popupPos.push(pos);
}

function moveOnDrag(extent,delta){
	if($("#popup").is(":visible") && $("#popupArrow").is(":visible")){
		$("#popupArrow").css('left',delta.x+popupPos[0].arrow.left);
		$("#popupArrow").css('top',delta.y+popupPos[0].arrow.top);
		$("#popup").css('left',delta.x+popupPos[0].popup.left);
		$("#popup").css('top',delta.y+popupPos[0].popup.top);
	}
}

//Legend Filter
function hideAll(){
	if($("#selAllChk").is(':checked')){
		for(i=0;i<points.graphics.length;i++){
			points.graphics[i].show();
			console.log('test');
		}
		for (i=1;i<$(".legChk").length;i++){
			cb = $(".legChk")[i];
			cb.checked = true;
		}
	}
	else{
		for(i=0;i<points.graphics.length;i++){
			points.graphics[i].hide();
		}	
		for (i=1;i<$(".legChk").length;i++){
			cb = $(".legChk")[i];
			cb.checked = false;
		}
	}
	$('#popupArrow').hide();
	$('#popup').hide();
}

function clearCat(event,cat,id){
	if(document.getElementById(id).checked == true){
		for(i=0;i<points.graphics.length;i++){
			if(points.graphics[i].attributes.physicalType == cat){
				points.graphics[i].show();
			}
		}
	}
	else{
		for(i=0;i<points.graphics.length;i++){
			if(points.graphics[i].attributes.physicalType == cat){
				points.graphics[i].hide();
			}
		}
	}
	$('#popupArrow').hide();
	$('#popup').hide();
}