/*
 * Link Fader 1.1, jQuery plugin
 * 
 * Copyright(c) 2009, Cedric Dugas
 * http://www.position-relative.net
 *	
 * Make any link using the image remplacement technique fade
 * Licenced under the MIT Licence
 */

$(document).ready(function() {
	hoverOpacity.init();
});

hoverOpacity = {
	init : function(){
		$('a.linkFader').css({
			position:"relative",
			backgroundPosition:"0px 0px",
			cursor:"pointer"
		})
		//
		$('a.linkFader').each(function(){
			
			$spanFader = $('<span>');
			$(this).append($spanFader);
			console.log($spanFader);
			myBG = $(this).css("background-image");
			spanWidth =  $(this).css("width");
			spanHeight =  $(this).css("height");
			console.log(myBG,spanWidth,spanHeight);
				
			$(this).find("span").css({
				backgroundImage:myBG,
				backgroundPosition:"bottom left",
				position:"absolute",
				top: 0,
				left:0,
				display:"block",
				cursor:"pointer",
				width:spanWidth,
				height:spanHeight,
				opacity:0,
				visibility:"visible"
			})
		})
		//
		$("a.linkFader").hover(function () {
			$(this).find("span").stop()
			$(this).find("span:not(:animated)").animate({opacity: 1}, 300)
		},
		function () {
			$(this).find("span").animate({opacity: 0},250)
		});
	}
}