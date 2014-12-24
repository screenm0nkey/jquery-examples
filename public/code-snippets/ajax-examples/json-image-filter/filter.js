jQuery(function($){
    var thumbnailUrl = "http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}_s.jpg";
    var linkUrl = "http://www.flickr.com/photos/mjryall/{id}/";
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?", function(data){
        var photos = data.photos.photo;
        var list = $("<ul></ul");
        $.each(photos, function(i, photo){
            var url = thumbnailUrl.replace("{farm-id}", photo.farm).replace("{server-id}", photo.server).replace("{id}", photo.id).replace("{secret}", photo.secret);
            var img = $("<img/>").attr("src", url).attr("title", photo.title).attr("alt", "A photo on Flickr");
            var href = linkUrl.replace("{id}", photo.id);
            var link = $("<a></a>").attr("href", href).append(img);
            var caption = $("<a/>").attr("href", href).text(photo.title).addClass("caption");
            var div = $("<div/>").append(link).append(caption);
            $(list).append($("<li/>").append(div));
        });
        $("#flickr-photos .loading").remove();
        $("#flickr-photos").append(list);
    })
    
    
    $("#filter").keyup(function(){
        var filter = $(this).val(), count = 0;
        $(".filtered:first li").each(function(){
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).addClass("hidden");
            }
            else {
                $(this).removeClass("hidden");
                count++;
            }
        });
        $("#filter-count").text(count);
    });
});

