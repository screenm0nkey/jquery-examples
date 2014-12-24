(function(options){

    if (typeof jQuery == 'undefined') {
        // http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
        var jQ;
        jQ = document.createElement('script');
        jQ.type = 'text/javascript';
        jQ.onload = run;
        jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        document.body.appendChild(jQ);
    }
    else {
        run();
    }
    
	//insert JavaScript
    function run(){
       jQuery.getScript('http://www.cornify.com/js/cornify.js', function(){
	   	var times = [42,28,75,50,62];		
			times = times[Math.floor(Math.random()*times.length)] //get random number 
	   		while (--times) {
				cornify_add();
			}
	   });
    }
    
})();



