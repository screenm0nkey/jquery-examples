
/* Stops Firebug logging errors in IE
 * http://paulirish.com/2008/graceful-degredation-of-your-firebug-specific-code/
 ----------------------------------------*/
if (!("console" in window) || !("firebug" in console)) {
    var names = ["clear", "log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i < names.length; ++i) 
        window.console[names[i]] = function(){
        };
}

