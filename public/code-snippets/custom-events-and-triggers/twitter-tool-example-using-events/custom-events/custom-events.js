//http://fuelyourcoding.com/jquery-plugin-design-patterns-part-i/

(function($){
    var $actions = $('<ul class="actions" />');
    $('<li class="refresh">Refresh</li>').appendTo($actions);
    $('<li class="remove">Remove</li>').appendTo($actions);
    $('<li class="collapse">Collapse</li>').appendTo($actions);
    
    var searchTerms = {};
    
    $.fn.twitterThing = function(config){
        return $(this).each(function(){
        
            var $this = $(this), 
				term = config.term, 
				$actions = config.actions.clone();//refresh, remove, collapse buttons
            
            
			//attach custom event triggers to the buttons
            $actions.find('li').each(function(){
                $(this).click(function(){
                    var clarse = $(this).attr('class').toUpperCase();
                    $this.trigger(clarse);
                });
            });
            
            $this.prepend($actions);
            $this.find('h2').text(config.term);
            
            $this.bind({
                'REFRESH': function(e){
                    $this.find('p.tweet').remove();
                    var $load = $('<p class="loading">Loading ...</p>');
                    $this.append($load);
                    
                    $.getJSON('http://search.twitter.com/search.json?q=' + escape(config.term) + '&rpp=3&callback=?', function(json){
                        $load.remove();
                        $this.trigger('POPULATE', [json]);
                    });
                },
                'REMOVE': function(e, force){
                    if (!force && !confirm('You Sure')) {
                        return;
                    }
                    $this.remove();
                    searchTerms[config.term] = false;
                },
                'COLLAPSE': function(e){
                    $this.find('li.collapse').removeClass('collapse').addClass('expand').text('Expand');
                    $this.addClass('collapsed');
                },
                'EXPAND': function(e){
                    $this.find('li.expand').removeClass('expand').addClass('collapse').text('Collapse');
                    $this.removeClass('collapsed');
                },
                'POPULATE': function(e, json){
                    var results = json.results;
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
