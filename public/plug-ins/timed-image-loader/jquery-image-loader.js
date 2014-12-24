$(function(){

    var flickr_set = 'http://www.flickr.com/photos/baliwebdesign/2802705514/';
    
    var images = new Array();
    images[0] = 'http://static.flickr.com/3425/3809891544_41355d276d_t.jpg';
    images[1] = 'http://static.flickr.com/2507/3809890002_d218b16fa5_t.jpg';
    images[2] = 'http://static.flickr.com/3382/3672919869_62d3491dc8_t.jpg';
    images[3] = 'http://static.flickr.com/2675/3809890572_7d3c33c333_t.jpg';
    images[4] = 'http://static.flickr.com/2562/3673729144_5315a0303b_t.jpg';
    images[5] = 'http://static.flickr.com/3299/3672951909_6630feef1a_t.jpg';
    var max = images.length;
    
    if (max > 0) {
        var $ul = $('<ul id="portfolio"></ul>');
        $($ul).appendTo($('#wrapper')).after($('div.clear'));
        var loadnote = $('<div id="loadnote" style="display:none"></div>');
        $(loadnote).appendTo($('body'));
        LoadImage(0, max);
    }
    
    function LoadImage(index, max){
        if (index < max) {
            $('#loadnote').html("Loading " + (index + 1) + " of " + max).fadeIn("fast");
            
            var $list = $('<li id="portfolio_' + index + '"></li>').attr('class', 'loading');
            $('ul#portfolio').append($list);
            
            var img = new Image();
            
            var curr = $("ul#portfolio li#portfolio_" + index);
            
            $(img).load(function(){
                $(this).css('display', 'none'); // since .hide() failed in safari
                $(curr).removeClass('loading').append(this);
                $(this).wrap('<a href="../image_pre_loader/' + flickr_set + '"></a>');
                $(this).fadeIn('fast', function(){
                    if (index == (max - 1)) {
                        $(loadnote).hide();
                    }
                    else {
                        $(loadnote).html('Wait Loading Next Item ...');
                        $(this).oneTime(500, function(){
                            LoadImage(index + 1, max);
                        });
                    }
                });
            }).error(function(){
                $(curr).remove();
                LoadImage(index + 1, max);
            }).attr('src', images[index]);
        }
    } 
});
