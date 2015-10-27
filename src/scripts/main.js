 $(document).ready(function(){

	 var map = $('.map svg');
	 var tooltipVisible = false;

	 map.click(function(){
		 $('.tooltip').fadeOut();
		 tooltipVisible = false;
	 });

	 $('#animated path').click(function(e){

		 e.stopPropagation();

		 var path = $(this);
		 var nextUse = path.next('use');
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
			 top = parseInt(yRatio * (boundingRect.y + boundingRect.height / 2));
			 left= parseInt(xRatio * (boundingRect.x + boundingRect.width / 2) + 20);
		 }

		 // Show or move tooltip
		 var tooltip = $('.tooltip');
		 if (tooltipVisible){
			 tooltip
			 .animate({'opacity': 0}, 250)
			 .delay(250)
			 .queue(function () {
				fillData(path, tooltip);
				$(this)
				.css({
					 'left':left,
					 'top':top,
				})
				.animate({'opacity': 1}, 250);
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
			 .animate({'opacity': 1}, 250);
		 }

		 tooltipVisible = true;


	 });
 });


 var fillData = function(path, tooltip){
	 tooltip.find('.tooltip__title').text(path.data("title"));
	 tooltip.find('.t-icon__quantity--users').text(path.data("u"));
	 tooltip.find('.t-icon__quantity--questions').text(path.data("q"));
	 tooltip.find('.t-icon__quantity--comments').text(path.data("c"));
	 tooltip.find('.t-text--theme .t-text__title').text(path.data("theme"));
	 tooltip.find('.t-text--tonality .t-text__title').text(path.data("tonality"));
 }