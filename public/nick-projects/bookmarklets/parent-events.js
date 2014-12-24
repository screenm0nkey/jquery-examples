if (typeof jQuery === 'undefined') {
	loadjQuery(startFunc);
} else {
	startFunc();
}

function loadjQuery(callback) {
	var jQ = document.createElement('script');
	jQ.type = 'text/javascript';
	jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
	document.getElementsByTagName('head')[0].appendChild(jQ);
	//The JQ.onload method doesn't work in IE6 & 7 so I'm using this self-invoking function expression. Much better way of doing it.
	(function checkLoaded() {
		try {
			//if jQuery wasn't already loaded then there's a chance the page might be using
			//another library, so we need to return $ back to it's original owner just in case.
			if (jQuery) {
				jQuery.noConflict();
				callback.call(this, 'jq-loaded');
			}
		} catch (e) {
			setTimeout(checkLoaded, 100);
		}
	})();
}

function startFunc() {
	if (!jQuery('#checkEvents')[0]) {
		var div = '<div id="checkEvents" style="z-index:99999;background:#fff;position:fixed; left:0; top:0; padding:10px;border:solid 5px #ccc;">';
		var form = '<form><input type="text" id="checkName" value="#"><input type="text" id="eventType" value="click"><input type="submit" value="Submit">';
		jQuery(div + form).find('form').bind('submit', checkEvents001).end().prependTo('body');
	}
}

function checkEvents001(evt) {
	var $form = jQuery(evt.target);
	var $val = jQuery($form.find('#checkName').val());
	var eventType = jQuery(evt.target).find('#eventType').val();
	var parentsArray = [];

	console.clear();

	if (!$val[0]) {
		alert('NO DOM ELEMENT EXISTS');
		return false;
	}

	if ($val.length > 1) {
		console.log($val, $val.length);
		alert('More than one element selected');
		return false;
	}

	if ($val[0] && $val.length === 1) {
		(function getParent($elm) {
			parentsArray.push($elm);
			var $parent, evt, thes;
			try {
				$parent = $elm.parent();
				evt = $parent.data('events');
				thes = $parent[0];

				if (evt) {
					jQuery.each(evt, function(i, evtObj) {
						if (evtObj[0].type === eventType) {
							console.log('EVENT MATCHES FOUND BOUND TO PARENT ELEMENTS\n', thes, '\n', evtObj[0].type, '\n', evtObj[0].handler, '\n', evtObj[0].handler.toString());
						}
					});
				}
			} catch (e) {
				//console.log($parent, e);
			}

			if ($parent[0].tagName !== 'BODY') {
				getParent($parent);
			} else {
				parentsArray.push($parent);
			}
		})($val);
	}
	
	
	(function(events) {
		if (events[eventType]) {
			console.log('\nPOSSIBLE MATCH');
			jQuery.each(events[eventType], function(i, evtObj) {
				var el, 
					i=0;
				
				if(evtObj.selector) {
					el = $(evtObj.selector)[0]; // elements that are bound useing jquery 'live' method

					if(el) {
						for (i = parentsArray.length - 1; i >= 0; i--) {
							if(el && el.id===parentsArray[i][0].id) {
								console.log(el, parentsArray[i][0].id, evtObj.origHandler);
								break;
							}
						};
					}
				}
			});
			
			console.log('\nEVENTS HANDLERS BOUND TO THE DOCUMENT ELEMENT \n', $(document), '\n');
			jQuery.each(events[eventType], function(i, evtObj) {
				if(evtObj.origType) {
					console.log(evtObj, '\n', evtObj.selector, '\n', evtObj.origType, '\n', evtObj.origHandler);
				} else {
					console.log(evtObj, '\n', evtObj.type, '\n', evtObj.handler);
					console.group()
					console.log(evtObj.handler.toString())
					console.groupEnd()
				}
			});
		}
	})($(document).data('events'))

	

	console.log('\n\nPARENTS LIST');
	jQuery.each(parentsArray, function(index, elm) {
		console.log(elm);
	});
	return false;
}