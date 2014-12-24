/*
 * jQuery.extLinks
 * Version: 1.0
 * http://www.hieu.co.uk
 *
 * Copyright (c) 2009 Hieu Pham - http://www.hieu.co.uk
 * COMMON DEVELOPMENT AND DISTRIBUTION LICENSE (CDDL)
 * http://www.opensource.org/licenses/cddl1.php
 * http://www.hieu.co.uk/blog/index.php/2009/04/07/how-to-make-plugin-extlinks-control-the-links/
 * Date: 07/04/2009
 */
(function($){
	$.fn.extLinks = function(Arguements, Callback) {
		//Default value should be set here
		var defaults = {
				PrefixObj: "",
				PreOpen: "NewTab", //What happen when user click on the prefix object
				LinkOpen: "SameTab", //What happen when user click on the link
				PostObj: "",
				PostOpen: "NewTab", //What happen when user click on the post object
				Links: "external" // external, internal, all - Which link you're target
		};

		var Args = $.extend(defaults, Arguements);
		var Obj = this; // Just a way to reference to current obj in case we need to pass in another event handle
		//Set the selector for all links
		var Selector = "a";
		//See what kind of link the user want to working with
		switch(Args.Links){
			case "external":
				//Selector to find all external links
				Selector = "a[href*='http://']:not([href*='"+location.hostname+"'])";
			break;
			case "internal":
				//Selector to find all internal links
				Selector = "a[href^='/'],a[href*='"+location.hostname+"']";					
			break;
		}
		//If user want to open link in newTab, bind this action to it
		if(Args.LinkOpen == "NewTab"){
			$(this).find(Selector).click(function(e){
				//Open link in new window with javascript
				var newWindow = window.open($(this).attr("href"),"_blank");
				newWindow.focus();
				e.preventDefault();					
			});
		}
		//If user want to add prefix object ex: image...
		if(Args.PrefixObj.length>0){
			if(Args.PreOpen == Args.LinkOpen){
				$(this).find(Selector).html(Args.PrefixObj + $(this).find(Selector).html());
			}else{
				//If user want to open the prefix object in new tab, add target to it
				if(Args.PreOpen == "NewTab")
					PreTarget = "target=\"_blank\"";
				else PreTarget = "";
				//Insert the object in to the document
				$(this).find(Selector).each(function(){
					$(this).before("<a href='"+$(this).attr("href")+"' " + PreTarget + ">" + Args.PrefixObj + "</a>");
				});
			}
		}
		//If user want to add postfix object ex: image...
		if(Args.PostObj.length>0){
			//Run through every single selected object
			if(Args.PostOpen == Args.LinkOpen){
				$(this).find(Selector).html($(this).find(Selector).html() + Args.PostObj);
			}else{
				//If user want to open the post object in new tab, add target to it
				if(Args.PostOpen == "NewTab")
					PostTarget = "target=\"_blank\"";
				else PostTarget = "";
				//Insert the object in to the document
				$(this).find(Selector).each(function(){
					$(this).after("<a href='"+$(this).attr("href")+"' " + PostTarget + ">" + Args.PostObj + "</a>");
				});
			}
		}
	};
})(jQuery);