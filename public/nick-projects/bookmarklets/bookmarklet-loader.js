(function(options){

    if (typeof jQuery == 'undefined') {
        // http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
        var jQ;
        jQ = document.createElement('script');
        jQ.type = 'text/javascript';
        jQ.onload = insertCSS;
        jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        document.body.appendChild(jQ);
    }
    else {
        insertCSS();
    }
    
	//insert JavaScript
    function insertCSS(){
        $.each(options.css, function(i, val){
            $('<link>').attr({
                href: val,
                rel: 'stylesheet'
            }).appendTo('head');
        });
        insertJS();
    }
    
	//insert JavaScript
    function insertJS(){
        if (options.js.length === 0) {
            options.ready();
            return false;
        }
        $.getScript(options.js[0], function(){
			options.js = options.js.slice(1);
            insertJS();
        });
    }
})({
    css:['http://tablesorter.com/themes/blue/style.css'],
    js: ['http://tablesorter.com/jquery.tablesorter.js'],
    ready: function(){
        $("table").tablesorter().addClass("tablesorter");
    }
});



