// we'll use this every time we add a new results panel,
// so let's build it once and cache it in $actions
var $actions = $('<ul class="actions" />');
$('<li class="refresh">Refresh</li>').appendTo($actions);
$('<li class="remove">Remove</li>').appendTo($actions);
$('<li class="collapse">Collapse</li>').appendTo($actions);

// this is where we'll keep track of which search terms
// are shown on the page already
var search_terms = {};


/**** plugin for setting up custom event bindings for results containers ****/
$.fn.setupResults = function(settings){
    return $(this).each(function(){
    
        var $results = $(this);
        var $actions = settings.actions;
        var term = settings.term;
        
        // change the "Search results for" text
        $results.find('span.search_term').text(term);
        
        // bind custom events for results box
        $results.        // the "refresh" event fetches the latest content for the term
        bind('refresh', function(e){
            // indicate that the results are refreshing
            var $this = $(this).addClass('refreshing');
            
            $this.find('p.tweet').remove();
            $results.append('<p class="loading">Loading ...</p>');
            
            // get the twitter data using jsonp
            $.getJSON('http://search.twitter.com/search.json?q=' + escape(term) + '&rpp=5&callback=?', function(json){
                $this.trigger('populate', [json]);
            });
        }).        // the "populate" event takes results in json format 
        // and populates the results container
        bind('populate', function(e, json){
            var results = json.results;
            var $this = $(this);
            
            $this.find('p.loading').remove();
            
            $.each(results, function(i, result){
                var tweet = '<p class="tweet">' +
                '<a href="http://twitter.com/' +
                result.from_user +
                '">' +
                result.from_user +
                '</a>: ' +
                result.text +
                ' <span class="date">' +
                result.created_at +
                '</span>' +
                '</p>';
                $this.append(tweet);
            });
            
            // indicate that the results are done refreshing
            $this.removeClass('refreshing');
        }).        // the remove event removes the results from the page
        // after the user confirms the action
        bind('remove', function(e, force){
            // allow forced removal without confirmation
            if (!force && !confirm('Remove panel for term ' + term + '?')) {
                return;
            }
            $(this).remove();
            
            // indicate that we no longer have a panel for the term
            search_terms[term] = 0;
        }).        // the collapse event collapses the results so only the
        // header of the results section is showing
        bind('collapse', function(e){
            $(this).find('li.collapse').removeClass('collapse').addClass('expand').text('Expand');
            
            $(this).addClass('collapsed');
        }).        // the expand event
        bind('expand', function(e){
            $(this).find('li.expand').removeClass('expand').addClass('collapse').text('Collapse');
            
            $(this).removeClass('collapsed');
        });
        
		
		
        if ($actions && $actions.length) {
            // add a clone of $actions to the results panel
            var $a = $actions.clone().prependTo($results);
            // use the class of each action to figure out 
            // which event it will trigger on the results panel
            $a.find('li').click(function(){
                // pass the li that was clicked to the function
                // so it can be manipulated if needed
                $results.trigger($(this).attr('class'), [$(this)]);
            });
        }
    });
};

/**** custom event bindings for twitter widget ****/
$('#twitter').bind('getResults', function(e, term){
    // make sure we don't have a box for this term already
    if (!search_terms[term]) {
        var $this = $(this);
        var $template = $this.find('div.template');
        
        // make a copy of the template div
        // and insert it as the first results box
        $results = $template.clone().removeClass('template').insertBefore($this.find('div:first')).setupResults({
            'term': term,
            'actions': $actions
        });
        
        // load the content usig the "refresh" 
        // custom event that we bound to the results container
        $results.trigger('refresh');
        search_terms[term] = 1;
    }
}).bind('getTrends', function(e){
    var $this = $(this);
    $.getJSON('http://search.twitter.com/trends.json?callback=?', function(json){
        var trends = json.trends;
        $.each(trends, function(i, trend){
            $this.trigger('getResults', [trend.name]);
        });
    });
});

// random items on the page trigger events

$('form').submit(function(e){
    e.preventDefault();
    var term = $('#search_term').val();
    $('#twitter').trigger('getResults', [term]);
});

$('#get_trends').click(function(){
    $('#twitter').trigger('getTrends'); // calls getResults
});

$('#refresh').click(function(e){
    $('#twitter div.results').trigger('refresh'); // calls refresh on individual terms
});

$('#expand').click(function(e){
    $('#twitter div.results').trigger('expand'); // calls expand on individual terms
});

$('#collapse').click(function(e){
    $('#twitter div.results').trigger('collapse'); // calls collapse on individual terms
});

$('#remove').click(function(e){
    if (confirm('Remove all results?')) {
        $('#twitter div.results').trigger('remove', [true]);
    }
});

// refresh all items every minute
var refreshInterval = setInterval(function(){
    $('#twitter div.results').trigger('refresh'); // calls refresh on individual terms
}, 60000);

// pass search terms via URL hash 
if (document.location.hash) {
    var terms = document.location.hash.split(',').reverse();
    $.each(terms, function(i, term){
        $('#twitter').trigger('getResults', [term]);
    });
}



