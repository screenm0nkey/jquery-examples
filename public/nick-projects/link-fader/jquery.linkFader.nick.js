/*
 * Link Fader 2, jQuery plugin by Nick Lowman based on code by Cedric Dugas
 * 
 * Copyright(c) 2009, Nick Lowman
 * http://www.nicklowman.co.uk
 *	
 */

(function($){
	//define linkFader object with some default config settings
	$.linkFader = {
		defaults: {
			id: "",
			sizing: "px",
			fadeIn: 300,
			fadeOut: 250,
			click: true,
			callback: function(){}
		}
	};
	//
	//extend jquery with the plugin
	$.fn.extend({
		linkFader:function(config) {
			console.log(config);
			var config = $.extend({}, $.linkFader.defaults, config);
			//get the id of the selected element
			config.id = '#' + this.attr("id");
			setClick(config);
			setupMenu(config);
			//return the jquery object for chaining
			return this;
		}
	});
	//
	function setClick(config) {
		if(config.click===true) {
			$(config.id+' a[rel]').click(function() {
				$(config.id +' a[rel]').removeClass('selected'); 
				$(this).removeAttr('style').addClass('selected'); 
				setupMenu(config);
				config.callback(this);
				return false;
			});
		}
	}
	//
	function setupMenu(config) {	
	
		$spanTag = $(config.id+' a span'); //remove any <span> tags before creating new ones
		$spanTag.each(function() {
			$(this).remove();
		});
		
		$links = $(config.id + ' a[rel]:not(.selected)');
		$(config.id + ' a.selected').css('cursor','default');
		
		$links.each(function(){				 
			var ar_pos = $(this).attr('rel').split(" ");
			var bgPosition;
			var bgPositionHover;
			//
			if(ar_pos.length===4) {
				bgPosition = ar_pos[0]+config.sizing + ' ' + ar_pos[1]+config.sizing;
				bgPositionHover = ar_pos[2]+config.sizing + ' ' + ar_pos[3]+config.sizing;
			}
			//
			$(this).css({
				position:"relative",
				backgroundPosition:bgPosition,
				cursor:"pointer"
			})
			//
			$spanFader = $('<span>');
			$(this).append($spanFader);
			var myBG = $(this).css("background-image");
			var spanWidth =  $(this).css("width");
			var spanHeight =  $(this).css("height");
			//
			//find first span tag that is a direct child of this.	
			$('> span:first', this).css({
				backgroundImage:myBG,
				backgroundPosition:bgPositionHover,//left/top
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
		}); //end $links.each
		//
		$links.hover(function () {
			$('> span:first', this).stop(false,true)
			$('> span:not(:animated)', this).animate({opacity: 1}, config.fadeIn)
		},
		function () {
			$('> span:first', this).animate({opacity: 0}, config.fadeOut)
		});
	}//end setupMenu() 
})(jQuery);		  



