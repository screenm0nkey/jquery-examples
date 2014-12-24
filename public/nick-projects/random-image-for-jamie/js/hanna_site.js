
if (!hanna_site) {
    var hanna_site = {};
}


hanna_site.general = function($){

    var ramdomImage = function(obj){
        var $img = $(obj.imageContainer).find('img');
        var imgCount = obj.images.length;
        var images = [];
        
        //preload images
        for (var i in obj.images) {
            var path = obj.imagePath + obj.images[i];
            $('<img>').attr('src', path).load(function(){
                images.push(this);
            });
        }
        
        var lastNum = 0;
        var id = setInterval(function(){
            if (imgCount === images.length) {
                var num = Math.floor(Math.random() * imgCount);
                if (num === lastNum) {
                    num = (num === 0) ? num + 1 : num - 1
                }
                lastNum = num;
                $img.hide().attr('src', images[num].src).fadeIn(300);
            }
        }, obj.delay);
    }
    
    return {
        random: ramdomImage
    }
}(jQuery);
