/*
* immediateSiblings 1.0.0 (2008-07-14)
*
* Copyright (c) 2006,2007 Jonathan Sharp (http://jdsharp.us)
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
* http://jdsharp.us/
*
* Built upon jQuery 1.2.6 (http://jquery.com)
*/
(function($){  
		  
$.fn.immediateSiblings = function(selector) {
	var siblings = [];
	console.log("Selector=",selector);
	console.log("This=",this);
	if ( this.length > 0 ) {
		this.each(function() {
			var elm = $(this);
			console.log(elm);
			while ( elm.prev().is( selector ) ) {
				elm = elm.prev();
				console.log("elm = ",elm);
				siblings.unshift( elm[0] );
				console.log("siblings=",siblings);
			}
			siblings.push( this );
			console.log("siblings=",siblings);
			var elm = $(this);
			console.log("elm = ",elm);
			while ( elm.next().is( selector ) ) {
				elm = elm.next();
				console.log("elm = ",elm);
				siblings.push( elm[0] );
				console.log("siblings=",siblings);
			}
		});//this.each
	} //if statement
	return this.pushStack( $.unique( siblings ) );
};

})(jQuery); 