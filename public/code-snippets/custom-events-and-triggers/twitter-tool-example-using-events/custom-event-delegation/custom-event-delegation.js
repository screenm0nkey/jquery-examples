
var log = console.log;

(function($){
    var $actions = $('<ul class="actions" />');
    $('<li class="refresh">Refresh</li>').appendTo($actions);
    $('<li class="remove">Remove</li>').appendTo($actions);
    $('<li class="collapse">Collapse</li>').appendTo($actions);
    
    var searchTerms = {};
    
    //plug-in
    $.fn.twitterThing = function(config){
        return $(this).each(function(){
        
            var $this = $(this); 
            
            $this.data('config', {
                $actions: $actions = config.actions.clone(),//refresh, remove and collapse buttons
                term: config.term
            });
            
            //trigger the action for the buttons. it uses event bubbling for the custom events which are captured at the div#twitter container
            $actions.find('li').each(function(){
                $(this).click(function(){
                    var clarse = $(this).attr('class').toUpperCase();
                    $this.trigger(clarse);
                });
            });
            
            $this.prepend($actions);
            $this.find('h2').text(config.term);
        });
    };
    
    
    
    $(document).ready(function(){
        var $twitter = $('#twitter');
        var $template = $('div.template');
        
        $twitter.bind({
            'GET_TRENDS': function(e){
                var $this = $(this);
                $.getJSON('http://search.twitter.com/trends.json?callback=?', function(json){
                    $.each(json.trends, function(i, item){
                        $this.trigger('GET_RESULTS', [item.name]);
                    });
                });
            },
            'GET_RESULTS': function(e, term){
                if (!searchTerms[term]) {
                    $template.clone().removeClass('template').prependTo($twitter[0]).twitterThing({
                        term: term,
                        actions: $actions
                    }).trigger('REFRESH');
                    
                    searchTerms[term] = true;
                }
            }
        });
        
        //EVENT DELEGATION
        //these are the events which bubble up from the indiviual divs and are captured using event delegation
        //Below I've used, delegate(), live() and bind() and they all do the same thing but use differnt jQuery methods to do so
        
        //delegate()
        $twitter.delegate('div.results', 'REMOVE', function(e, force){
            var $this = $(this), 
				config = $this.data('config');
            
            if (!force && !confirm('You Sure')) {
                return;
            }
            searchTerms[config.term] = false;
            $this.remove();
        });
        
        
        //live()
        $('div.results:not(.template)', $twitter[0]).live('REFRESH', function(e){
        
            var $this = $(this), 
				config = $this.data('config');
            if (config) {
                //The &&  operator returns the value of the first false operand, or the value of the last operand if both operands are truthy.
                // So if $this.find('p.tweet').length > 0 it will return and run $this.find('p.tweet').remove()  
                
                $this.find('p.tweet').length && $this.find('p.tweet').remove();
                
                var $load = $('<p class="loading">Loading ...</p>');
                $this.append($load);
                
                $.getJSON('http://search.twitter.com/search.json?q=' + escape(config.term) + '&rpp=3&callback=?', function(json){
                    $load.remove();
                    $this.trigger('POPULATE', [json]);
                });
            }
        });
        
        
        //bind()
        $twitter.bind({
            'COLLAPSE': function(e){
                //this = div#twitter
                var $this = $(e.target).closest('div.results');
                $this.find('li.collapse').removeClass('collapse').addClass('expand').text('Expand');
                $this.addClass('collapsed');
            },
            'EXPAND': function(e){
                var $this = $(e.target).closest('div.results');
                $this.find('li.expand').removeClass('expand').addClass('collapse').text('Collapse');
                $this.removeClass('collapsed');
            },
            'POPULATE': function(e, json){
                var $this = $(e.target).closest('div.results'), 
					results = json.results;
                $.each(results, function(i, result){
                    var $img = $('<img>', {
                        src: result.profile_image_url
                    });
                    
                    var $tweet = $('<p class="tweet">' +
                    '<a href="http://twitter.com/' +
                    result.from_user +
                    '">' +
                    result.from_user +
                    '</a>: ' +
                    result.text +
                    ' <span class="date">' +
                    result.created_at +
                    '</span>' +
                    '</p>').append($img);
                    //tweet.append($img);
                    $this.append($tweet);
                });
            }
        });
        
        
        
        $('input.input_submit').parents('form').submit(function(){
            var val = $('input.input_text', this).val();
            $twitter.trigger('GET_RESULTS', [val]);
            return false;
        });
        
        $('#get_trends').click(function(e){
            $twitter.trigger('GET_TRENDS');
        });
        
        $('#refresh').click(function(e){
            $('div.results', $twitter[0]).trigger('REFRESH');
        });
        
        $('#remove').click(function(e){
            if (confirm('You Sure!')) {
                $('div.results', $twitter[0]).trigger('REMOVE', [true]);
            }
        });
        
        $('#collapse').click(function(e){
            $('div.results', $twitter[0]).trigger('COLLAPSE');
        });
        
        $('#expand').click(function(e){
            $('div.results', $twitter[0]).trigger('EXPAND');
        });
        
        // refresh all items every minute
        var refreshInterval = setInterval(function(){
            $('#twitter div.results').trigger('REFRESH'); // calls refresh on individual terms
        }, 60000);
		
		
		//this just shows the events attached to elements in the DOM
		$('#show-events').click(function(){
			console.clear();
            $('*').each(function(){
                $this = $(this);
                if ($this.data('events')) {
					console.group(this.nodeName);
                    console.log($this,'\n', this);
                    console.dir($this.data('events'));
					console.groupEnd();
                }
            });
        });
    });
    
})(jQuery);
