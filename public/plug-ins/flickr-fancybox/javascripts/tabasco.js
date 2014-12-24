$(document).ready(function() {
	//arrowLinks();
	flickrGallery();
	initNav();
	zebraTable();
	printPage();
	overBox();
	popup();
	voucher();
	gallery();
});
function overBox(domChunk){
	$("a.overbox").click(function(){
		var a = this.href;
		ob_show(a);
		this.blur();
		return false;
	});
	function ob_show(url) {
		try {
			if (!jQuery.support.boxModel) {
				$("body","html").css({height: "100%", width: "100%"});
				$("html").css("overflow","hidden");
			}
			if($("OB_overlay").size() === 0){
				$("body").append("<div id='OB_overlay'></div><div id='OB_window'><div id='OB_close'><span>Close</span></div></div>")
				$("#OB_overlay").css("opacity",0.75);
				$("#OB_overlay, #OB_close").click(ob_remove);
			}
			$("#OB_window").append("<iframe frameborder='0' hspace='0' src='"+url+"' id='OB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' allowtransparency='true' scrolling='no'></iframe>");
			ob_position();
			} catch(e){
		}
	}
	function ob_position() {
		var content = $("#OB_window iframe")
		$("#OB_window").css({marginLeft: -($(content).width()/2), width: $(content).width()});
		if (jQuery.support.boxModel) { // take away IE6
			$("#OB_window").css({marginTop: -($(content).height()/2)});
		}
	}
	function ob_remove() {
		$("#OB_window").fadeOut("normal",function(){$('#OB_window,#OB_overlay').trigger("unload").unbind().remove();});
		if (!jQuery.support.boxModel) {
			$("body","html").css({height: "auto", width: "auto"});
			$("html").css("overflow","");
		}
		return false;
	}
}
function ob_showIframe(){
	$("#OB_window").css({display:"block"});
}
function printPage(){
	$("a.print").click( function(){
		window.print();
		return false;
	});
};
function zebraTable() {
	$("table.zebra").find("tbody tr").each(function (e){
		(e%2==0)?$(this).addClass("odd"):null;
	});
};
function initNav() {
	$("#navigation").addClass("activated");
	var urlString = (String(top.location).split('index.html'));
	findElement($("#navigation"));
	function findElement(container) {
		var find = -1;
		var root = $(container).children().children().children().not("ul");
		if ( $(root).size()>0) {
			$(root).each(function(element){
				var navItem = ($(this).attr("href").split('index.html'));
				
				for (var x in navItem) {
					var current = navItem[x];
					var position = $.inArray(current,urlString);
					if (position >= 0) {
						find = element;
						urlString.splice(position,1);
					}
				};
			}).eq(find).parent().addClass("selected");
		}
		if (find>=0) findElement($(root).eq(find).parent());
	}
	function cleanArray(actual) {
		var newArray = new Array();
		for(var i = 0; i<actual.length; i++){
			if (actual[i]){
				newArray.push(actual[i]);
			}
		}
		return newArray;
	}
};
function arrowLinks() {
	var pattern = 'a.arrow';
	//firefox bug for link inline images. It applies the same text-decoration behaviour on the whole block.
    $(pattern).append('<img src="/images/lyt-link-arrow.gif" alt="follow this link" />');
};
function flickrGallery() {
	$("#bottom-flickr").flickr({     
		api_key: "68b79478bbd6f11c2514f2671c22dc88",
		type: 'search',
		group_id: '17038439@N00',
		show: 8,
		shuffle: true,
		attr: 'rel="flickr"',
		callback: liteboxCallback
	}); 
}; 
function liteboxCallback(el){
	$("#bottom-flickr ul a").fancybox({
		zoomSpeedIn: 300,
		zoomSpeedOut: 300,
		overlayOpacity: 0.6
		//overlayShow: false 
	});
};

// popup window for terms
function popup(){
	$("a.popup").fancybox({
		zoomSpeedIn: 300,
		zoomSpeedOut: 300,
		overlayOpacity: 0.6,
		frameHeight: 400,
		padding: 5,
		hideOnContentClick: false 
		//overlayShow: false
	});
};

// popup window for voucher
function voucher(){
	$("a.voucher").fancybox({
		zoomSpeedIn: 300,
		zoomSpeedOut: 300,
		overlayOpacity: 0.6,
		frameWidth: 600,
		frameHeight: 600,
		padding: 5,
		hideOnContentClick: false 
		//overlayShow: false
	});
};

// popup window for gallery
function gallery(){
	$("a.gallery").fancybox({
		zoomSpeedIn: 300,
		zoomSpeedOut: 300,
		overlayOpacity: 0.6,
		frameHeight: 400,
		padding: 5,
		hideOnContentClick: false 
		//overlayShow: false
	});
};