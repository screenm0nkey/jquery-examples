//load a local version of firebug so it can't be loaded live server
(function(){
	if (window.navigator.appName.indexOf('Microsoft') > -1 && !window.Firebug) {
		var fb = document.createElement('script');
		fb.type = 'text/javascript';
		fb.src = 'http://libraries/firebug-lite.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(fb, s);
	}
})()

//If firebug didn't load above for some reason then add array to stop js errors on console.log
if (window.navigator.appName.indexOf('Microsoft') > -1 && !window.Firebug) {
    var names = ["log", "dir", "clear", "debug", "info", "warn", "error", "assert", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i < names.length; ++i) 
        window.console[names[i]] = function(){
        };
}

//log shortcuts
window.log = function(){
    log.history = log.history || []; //store logs to an array for reference
    log.history.push(arguments);
    if (this.console) {
        //console.log(Array.prototype.slice.call(arguments));
    }
};

window.dir = function(){
    if (this.console) {
        console.dir(Array.prototype.slice.call(arguments));
    }
};