/*
 BIO CAROUSEL v1.0
 */
(function($, window, document, undefined){

    /*
     * http://www.w3.org/html/wiki/Elements/video
     * PROPERTIES
     * play() and pause()
     * volume
     * muted
     * currentTime
     * duration
     *
     * EVENTS
     * loadeddata
     * play/pause
     * timeupdate
     * ended
     */
    //VIDEO-PLAYER
    $.fn.videoPlayer = function(options){
        var opts = $.extend(true, {}, $.fn.videoPlayer.defaultOptions, options || {});
        
        return this.each(function(){
            var $videosContainer = $(this);
            var $videos = $videosContainer.find('video');
			var $cover = $(opts.cover);
            var $links;
            var linkArr = [];
            var $videoTemplate;
            var activeVideo;
            
            
            
            //Add properties to the objects stored in linkArr array
            function updateList(fileName, name, prop){
                //console.log('updateList - ', fileName, name, ' = ', prop);
                var len = linkArr.length;
                var returnObj;
                for (var i = 0; i < len; i++) {
                    var obj = linkArr[i];
                    if (obj.fileName === fileName) {
                        obj[name] = prop;
                        returnObj = obj;
                        return false;
                    }
                }
            }
            
            
            function getListObject(fileName){
                //console.log('getListObject - ', fileName);
                var len = linkArr.length;
                var returnObj;
                
                for (var i = 0; i < len; i++) {
                    var obj = linkArr[i];
                    if (obj.fileName === fileName) {
                        returnObj = obj;
                    }
                }
                return returnObj;
            }
            
            
            //returns the file name of the video which follows the fileName argument 
            function getNextVideo(fileName){
                //console.log('getNextVideo - ', fileName);
                var len = linkArr.length;
                var nextObj;
                for (var i = 0; i < len; i++) {
                    var obj = linkArr[i];
                    if (obj.fileName === fileName) {
                        nextObj = (i === (len - 1)) ? linkArr[0] : linkArr[i + 1];
                    }
                }
                return nextObj.fileName;
            }
            
            
            function playVideo(video, click, fileName){
                //console.log('playVideo() ', fileName);
                var $video;
                var fileName;
                
                //user has clicked on next or previous buttons so play video immediatley
                if (click) {
                    if (activeVideo) {
                        $(activeVideo).removeClass('active');
                        //console.log('STOPPING ', $(activeVideo).attr('data-filename'));
                        activeVideo.pause();
                        activeVideo.currentTime = 0;
                        activeVideo = undefined;
                    }
                }
                
                if (!activeVideo) {
                    activeVideo = video;
                    video.controls = false;
                    video.muted = true;    
                    $(video).addClass('active');
                    //theres a slim chance that the activeVideo could end before the next video is ready to be played
                    //so check first to see if it's ready
                    (function checkLoaded(){
                        var obj = getListObject(fileName);
                        if (obj.loaded) {
							//console.log('PLAYING ', fileName);
                            video.play();
                        }
                        else {
                            setTimeout(checkLoaded, 100);
                        }
                    })();
                }
            }
            
            
            $videosContainer.bind({
                'START-VIDEO': function(evt){
					$cover.hide()
                    //console.log('\nSTART-VIDEO - ', evt.fileName);
                    var video = $videos.filter(function(){
                        return evt.fileName === $(this).attr('data-filename');
                    });
                    
                    playVideo(video[0], evt.click, evt.fileName);
                },
                'STOP-VIDEO': function(evt){
                    $this.text('\n\nStop ' + evt.videoName);
                }
            });
            
            
            $videos.bind({
                'playing': function(){
                   //$cover.fadeOut(1000);
				   $cover.hide()
                },
                'loadeddata': function(evt){
                    //when the loadeddata event fires the video is ready to be played
                    updateList($(evt.target).attr('data-filename'), 'loaded', true);
                },
                'ended': function(evt){
                    var fileName;
                    var nextFilename;
                    fileName = $(activeVideo).attr('data-filename');
                    //console.log('ENDED - ', fileName);
                    $(evt.target).removeClass('active');
                    activeVideo = undefined;
                    
                    if (opts.carouselMode) {
                        $('#carousel').trigger('NEXT');
                    }
                    else 
                        if (opts.autoMode) {
                            var e = jQuery.Event('START-VIDEO');
                            e.fileName = nextFilename;
                            $videosContainer.trigger(e);
                        }
                }
            });
            
            
            (function init(){
                opts.autoMode = (opts.videoFiles) ? true : false;
                
                if (opts.carouselMode) {
                    $links = opts.$carousel.find('a');
                    $links.each(function(){
                        linkArr.push({
                            fileName: $(this).attr('href'),
                            video: false, //video DOM element
                            loaded: false
                        });
                    });
                }
                else 
                    if (opts.autoMode) {
                    //TODO 
                    //write something that uses opts.videoFiles array passed in to play the videos
                    }
            })();
            
        });
    };
    
    //VIDEO-PLAYER - default properties
    $.fn.videoPlayer.defaultOptions = {
        output: '#output',
		cover:'#video-cover',
        path: 'video/',
        $carousel: $('#carousel'),
        width: '320',
        height: '240',
        autoMode: false,
        carouselMode: false
    };
    
})(jQuery, this, this.document);



















