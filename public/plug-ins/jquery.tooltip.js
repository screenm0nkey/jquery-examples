/*
 * Jquery Elastic ToolTip
 * 
 * A simple elastic tooltip 
 	add class tooltip and put your text in the REL attribut
 *
 * Copyright (c) 2009 Cedric Dugas - http://www.position-relative.net
 * Licenced under the MIT licence
 */
 
$(document).ready(function() {
	$("a.tooltip").tooltip({
		speed:300
	})
});

jQuery.fn.tooltip = function(settings) {
	
 	settings = jQuery.extend({
		easingSpeed:6,
		offsetX: -15,
		offsetY: 35
	}, settings);	
			var tooltipX = 0		// GLOBAL PLUGIN VARIABLE DECLARATION
			var tooltipY = 0
			var mouseX = 0
			var mouseY = 0
			var mouseX2 = 0
			var deleteTooltip = false
			var animateMyTooltip =""
			var openit=true
		
		$(this).hover(function(e) { // HOVER ELEMENT TO GET TOOLTIP
			if(openit == true){
				initiateTooltip(this,e)
				openit = false
			}
		},
		function() {	})	

		var initiateTooltip = function(caller,e) {
			$().unbind("mousemove");
			var text = $(caller).attr("rel")					// GET TOOLTIP TEXT
			
				tooltipX = e.pageX -settings.offsetX				// GET MOUSE POSITION FOR CREATING TOOLTIP (NOT BEGIN AT POS 0 - 0))
				tooltipY = e.pageY -settings.offsetY
				mouseX = e.pageX -settings.offsetX
				mouseY = e.pageY -settings.offsetY
			
			outOfBoundRight = $(caller).offset().left +$(caller).width() -settings.offsetX -2 // CREATE BOX POSITION TO DELETE THE TOOLTIP IF IT MOVE OUT
			outOfBoundBottom = $(caller).offset().top +$(caller).height() -settings.offsetY -2
			outOfBoundLeft = $(caller).offset().left -settings.offsetX -2 
			outOfBoundTop = $(caller).offset().top -settings.offsetY -2
			
			if($("#descTooltip").size() == 0){ 						//	CREATE TOOLTIP MARKUP
				var markup = "<div id='descTooltip'>"+text+"</div>"
				$("body").append(markup)
				$("#descTooltip").css({
						width:"200px",
						padding:"10px",
						background:"#ddd",
						position:"absolute",
						display:"block",
						opacity:0,
						zIndex:100000,
						top:mouseY,
						left:mouseX
					})
			}else{
				$("#descTooltip").html(text)
			}
			
			$("#descTooltip").animate({opacity:0.9},300)
			
			$().mousemove(function(e){				// GET MOUSE POSITION WHEN MOVED
				mouseX = e.pageX -settings.offsetX
				mouseY = e.pageY -settings.offsetY
				mouseX2= e.pageX -settings.offsetX

	
				var delayRemove = setTimeout(function(){_removeTest();}, 100)
					
				function _removeTest() {					// TEST POSITION TO SEE IF OUT OF BOX (DELETE TOOLTIP)
					if(mouseX>=outOfBoundRight || mouseY>=outOfBoundBottom || mouseX<=outOfBoundLeft || mouseY<=outOfBoundTop ){
						removeTooltip(caller)
					}
				}			
		  	 }); 	
				animateMyTooltip = setInterval(function(){_animateTooltip();},30)
					
				function _animateTooltip() {		// TOOLTIP FOLLOW MOUSE WITH EASING
					
				tooltipX -= (tooltipX-mouseX) / settings.easingSpeed;
				tooltipY -= (tooltipY-mouseY) / settings.easingSpeed;
				   
					$("#descTooltip").css({
						top:tooltipY,
						left:tooltipX
					})
				}		
		};
		var removeTooltip = function(caller) {
			
			$("#descTooltip").animate({
				opacity:0
			},200, function(){
				openit = true
				$().unbind("mousemove");
				$("#descTooltip").remove()
				clearInterval(animateMyTooltip)
			})
		};
};