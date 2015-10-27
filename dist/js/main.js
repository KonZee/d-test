 $(document).ready(function(){

	 var map = $('.map svg');

	 map.click(function(){
		 $('.tooltip').css('visibility', 'hidden');
	 });

	 $('#animated path').click(function(e){

		 e.stopPropagation();

		 var nextUse = $(this).next('use');
		 var top;
		 var left;


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
			 left = parseInt(xRatio * nextUse.attr("x") + 20);
		 }
		 // And without point
		 else{
			 var mapPosition = map.position();
			 var boundingRect = $(this)[0].getBBox();
			 console.log(boundingRect)
			 top = parseInt(yRatio * (boundingRect.y + boundingRect.height / 2));
			 left= parseInt(xRatio * (boundingRect.x + boundingRect.width / 2) + 20);
		 }

		 var tooltip = $('.tooltip');
		 tooltip
		 .delay(500)
		 .css({
			 'left':left,
			 'top':top,
		 })
		 .css({
			 'visibility': 'visible',
		 })
	 });
 });