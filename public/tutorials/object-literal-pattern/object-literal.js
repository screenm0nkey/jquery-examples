//http://blog.rebeccamurphey.com/2009/10/15/using-objects-to-organize-your-code/

var myFeature = {
    'config': {
        'container': $('#myFeature')
    },
    
    'init': function(config){
        if (config && typeof(config) == 'object') {
            $.extend(this.config, config);
        }
        
        this.$container = myFeature.config.container;
        this.$sections = myFeature.$container.find('ul.sections > li');
        this.$section_nav = $('<ul/>').attr('id', 'section_nav').prependTo(myFeature.$container);
        this.$item_nav = $('<ul/>').attr('id', 'item_nav').insertAfter(myFeature.$section_nav);
        this.$content = $('<div/>').attr('id', 'content').insertAfter(myFeature.$item_nav);
        this.buildSectionNav(myFeature.$sections);
        this.$section_nav.find('li:first').click();
        this.$container.find('ul.sections').hide();
        this.initialized = true;
    },
    
    
    'buildSectionNav': function($sections){
        $sections.each(function(){
            var $section = $(this);
            $('<li/>').text($section.find('h2:first').text()).appendTo(myFeature.$section_nav).data('section', $section).click(myFeature.showSection);
        });
        
    },
    
    'buildItemNav': function($items){
        $items.each(function(){
            var $item = $(this);
            $('<li/>').text($item.find('h3:first').text()).appendTo(myFeature.$item_nav).data('item', $item).click(myFeature.showContentItem);
        });
    },
    
    'showSection': function(){
        var $li = $(this);
        myFeature.$item_nav.empty();
        myFeature.$content.empty();
        var $section = $li.data('section');
        $li.addClass('current').siblings().removeClass('current');
        var $items = $section.find('ul li');
        myFeature.buildItemNav($items);
        myFeature.$item_nav.find('li:first').click();
        
    },
    
    'showContentItem': function(){
        var $li = $(this);
        $li.addClass('current').siblings().removeClass('current');
        var $item = $li.data('item');
        myFeature.$content.html($item.html());
        
    }
    
};
