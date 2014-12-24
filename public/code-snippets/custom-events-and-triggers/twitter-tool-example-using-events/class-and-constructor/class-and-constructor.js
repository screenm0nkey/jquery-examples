//http://fuelyourcoding.com/jquery-plugin-design-patterns-part-i/

(function($){

    var $actions = $('<ul class="actions" />');
    $('<li class="refresh">Refresh</li>').appendTo($actions);
    $('<li class="remove">Remove</li>').appendTo($actions);
    $('<li class="collapse">Collapse</li>').appendTo($actions);
    
    var searchTerms = {}, 
		TwitterThing = {};
    
    
    TwitterThing = function(el, config){
        var base = this; //new empty object
        base.$el = $(el);
        base.el = el;
        base.$el.data("twitter", base);
        //
        
        base.refresh = function(){
            base.$el.find('p.tweet').remove();
            var $load = $('<p class="loading">Loading ...</p>');
            base.$el.append($load);
            
            $.getJSON('http://search.twitter.com/search.json?q=' + escape(base.term) + '&rpp=3&callback=?', function(json){
                $load.remove();
                populate(json);
            });
        };
        
        base.remove = function(force){
            if (!force && !confirm('You Sure')) {
                return;
            }
            base.$el.remove();
            searchTerms[base.term] = false;
        };
        
        base.collapse = function(){
            base.$el.find('li.collapse').removeClass('collapse').addClass('expand').text('Expand');
            base.$el.addClass('collapsed');
        };
        
        base.expand = function(){
            base.$el.find('li.expand').removeClass('expand').addClass('collapse').text('Collapse');
            base.$el.removeClass('collapsed');
        };
        
        
        //base.init will be undefined as the self-invoking fucntion does not return a value
        base.init = function(){
            base.$actions = config.actions.clone();
            base.term = config.term;
            
            base.$el.prepend(base.$actions);
            base.$el.find('h2').text(base.term);
            
            base.$actions.find('li').each(function(){
                $(this).click(function(){
                    var clarse = $(this).attr('class');
                    base[clarse]();
                });
            });
        }();
        
        
        //making populate a function expression makes it a private variable
        var populate = function(json){
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
                base.$el.append($tweet);
            });
        };
    };
    
    
    $.fn.twitterThing = function(options){
        return $(this).each(function(){
            new TwitterThing(this, options);
        });
    };
    
    //$(document).ready(function(){});
    $(function(){
        var $twitter = $('#twitter');
        var $template = $('div.template');
        var jqSelector = ':not(div.template)';
        
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
                    }).data('twitter').refresh();
                    
                    searchTerms[term] = true;
                }
            }
        });
        
        
        //Add search term
        $('input.input_submit').parents('form').submit(function(){
            var val = $('input.input_text', this).val();
            $twitter.trigger('GET_RESULTS', [val]);
            return false;
        });
        
        //Load trending terms
        $('#get_trends').click(function(e){
            $twitter.trigger('GET_TRENDS');
        });
        
        //Refresh all results
        $('#refresh').click(function(e){
            $(jqSelector, $twitter[0]).data('twitter').refresh();
        });
        
        //remove all results
        $('#remove').click(function(e){
            if (confirm('You Sure!')) {
                $(jqSelector, $twitter[0]).each(function(){
                    $(this).data('twitter').remove(true);
                });
            }
        });
        
        //Collapse all results
        $('#collapse').click(function(e){
            $(jqSelector, $twitter[0]).data('twitter').collapse();
        });
        
        //Expand All Results
        $('#expand').click(function(e){
            $(jqSelector, $twitter[0]).data('twitter').expand();
        });
        
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
