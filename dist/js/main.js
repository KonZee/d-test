var path;
var map = $('.map svg');
var tooltipVisible = false;

$(document).ready(function(){


	 map.click(function(){
		 $('.tooltip').fadeOut();
		 tooltipVisible = false;
	 });

	 $('#animated path').click(function(e){

		 e.stopPropagation();

		 path = $(this);

		 tooltip();
	});
});

$(window).resize(function(){
	if(tooltipVisible){
		tooltip(0);
	}
});

var tooltip = function(speed){
	 var nextUse = path.next('use');
	 var top;
	 var left;
	 if (typeof speed === 'undefined'){speed = 250};

	 // Get size and real size of svg
	 // Need it because 'use' haven't boundbox
	 var vbWidth = parseFloat(map.attr('width'));
	 var vbHeight = parseFloat(map.attr('height'));
	 var width = map.width();
	 var height = map.height();
	 var xRatio = width / vbWidth;
	 var yRatio = height / vbHeight;

	 // Map part with point
	 if(nextUse.length > 0){
		 top = parseInt(yRatio * nextUse.attr("y"));
		 left = "calc(" + parseInt(xRatio * nextUse.attr("x")) + "px + 1vw)";
	 }
	 // And without point
	 else{
		 var mapPosition = map.position();
		 var boundingRect = path[0].getBBox();
		 top = parseInt(yRatio * (boundingRect.y + boundingRect.height / 2));
		 left= "calc(" + parseInt(xRatio * (boundingRect.x + boundingRect.width / 2)) + "px + 1vw)";
	 }

	 // Show or move tooltip
	 var tooltip = $('.tooltip');
	 if (tooltipVisible){
		 tooltip
		 .animate({'opacity': 0}, speed)
		 .delay(250)
		 .queue(function () {
			fillData(path, tooltip);
			$(this)
			.css({
				 'left':left,
				 'top':top,
			})
			.animate({'opacity': 1}, speed);
		 	$(this).dequeue();})
	 }else{
		 fillData(path, tooltip);
		 tooltip
		 .show()
		 .css({
			 'left':left,
			 'top':top,
			 'display': 'flex',
			 'opacity': 0,
		 })
		 .animate({'opacity': 1}, speed);
	 }

	 tooltipVisible = true;

};


 var fillData = function(path, tooltip){
	 tooltip.find('.tooltip__title').text(path.data("title"));
	 tooltip.find('.t-icon__quantity--users').text(path.data("u"));
	 tooltip.find('.t-icon__quantity--questions').text(path.data("q"));
	 tooltip.find('.t-icon__quantity--comments').text(path.data("c"));
	 tooltip.find('.t-text--theme .t-text__title').text(path.data("theme"));
	 tooltip.find('.t-text--tonality .t-text__title').text(path.data("tonality"));
 }