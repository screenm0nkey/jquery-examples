log = console.log;
FOO = {
    common: {
        init: function(){
            log('FOO.common.init()');
        },
        finalize: function(){
            log('FOO.common.finalize()');
        }
    },
    shopping: {
        init: function(){
            log('FOO.shopping.init()');
        },
        cart: function(){
            log('FOO.shopping.cart()');
        },
        category: function(){
            log('FOO.shopping.category()');
        }
    }
};

UTIL = {
    fire: function(func, funcname, args){
        var namespace = FOO; // indicate your obj literal namespace here
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
            namespace[func][funcname](args);
        }
    },
    
    loadEvents: function(){
        var bodyId = document.body.id;
        
        // hit up common first. it defaults to common.init()
        UTIL.fire('common');
        
        // do all the classes too. 
        $.each(document.body.className.split(/\s+/), function(i, classnm){
            UTIL.fire(classnm); //className.init()
            UTIL.fire(classnm, bodyId);
        });
        
		// so 'common' would be the class on the body element and 'finalize' would be the id i.e. <body id="finalize" class="common">
        UTIL.fire('common', 'finalize');
        
        $(document).bind('FINALISED', function(){
            log('FINALISED');
        });
        
        $(document).trigger('FINALISED');
    }
    
};

// kick it all off here 
$(document).ready(UTIL.loadEvents);

