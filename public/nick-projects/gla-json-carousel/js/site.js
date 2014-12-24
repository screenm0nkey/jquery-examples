/// <reference path="jquery-1.3.2-vsdoc2.js" />
/*----------------------------------------
Author:     	Nick Lowman
Author URI: 	http://www.tui.co.uk/
Project:		Greater London Auhtority	
Notes: 			
----------------------------------------*/


/* General utiility functions
----------------------------------------*/

$(function() {
    //borrowed from jQuery easing plugin
    //http://gsgd.co.uk/sandbox/jquery.easing.php
    $.easing.elasout = function(x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    };

    $.easing.backout = function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }

    jQuery.fn.fadeTo = function(speed, to, callback) {
        return this.animate({ opacity: to }, speed, function() {
            if (to == 1 && jQuery.browser.msie)
                this.style.removeAttribute('filter');
            if (jQuery.isFunction(callback))
                callback();
        });
    };
});




/* 
----------------------------------------*/

$(function() {
    var $paneTarget = $('#pane-target');
    var width = $paneTarget.width();
    var left = width;
    $paneTarget.scrollTo(left);
    var elemWidth = $paneTarget.find('li:first').outerWidth();
    var $pagination = $('#pagination-nav');

    $('#next').click(function() {
        left += width;

        switch (left) {
            case (13 * elemWidth):
                $paneTarget.scrollTo(0);
                left = 3 * elemWidth;
                break;
            case (14 * elemWidth):
                $paneTarget.scrollTo(elemWidth);
                left = 4 * elemWidth;
                break;
            case (15 * elemWidth):
                $paneTarget.scrollTo(2 * elemWidth);
                left = 5 * elemWidth;
                break;
        }

        //console.log(left);
        $paneTarget.stop().scrollTo({ top: 0, left: left }, 800, { easing: 'backout' }, {
            onAfter: function() {
                //console.log('shoot');
            }
        });
        return false;
    });


    $('#prev').click(function() {
        left -= width;

        switch (left) {
            case -elemWidth:
                $paneTarget.scrollTo(12 * elemWidth);
                left = 9 * elemWidth;
                break;
            case -(2 * elemWidth):
                $paneTarget.scrollTo(11 * elemWidth);
                left = 8 * elemWidth;
                break;
            case -(3 * elemWidth):
                $paneTarget.scrollTo(10 * elemWidth);
                left = 7 * elemWidth;
                break;
        }

        //console.log(left);
        $paneTarget.stop().scrollTo({ top: 0, left: left }, 800, { easing: 'backout' }, {
            onAfter: function() {
                //console.log('shoot');
            }
        });
        return false;
    });



    $('#main-nav').add($pagination).click(function(event) {
        $paneTarget.fadeTo('fast', 0); //hide the panel
        var ajaxData = $(event.target).attr('href');
        getCommentsJSON(ajaxData);
        return false;
    });



    function getCommentsJSON(ajaxData) {
        var jsonUrl = "json.php?" + ajaxData;
		
        $.getJSON(jsonUrl,
        function(data) {
            var html = '<ul>';
            $.each(data.items, function(i, item) {
                console.log(item.commentIndex);
                html += '<li>';
                html += '<p class="unecc">' + item.commentIndex + '</p>';
                html += '<p class="name">' + item.name + '</p>';
                html += '<p class="published">' + item.published + '</p>';
                html += '<p class="title">' + item.title + '</p>';
                html += '<p class="comment">' + item.comment + '</p>';
                html += '<p class="more"><a href="' + item.commenrURL + '">More...</a></p>';
                html += '<p class="rating">' + item.rating + '</p>';
                html += '<p class="number">' + item.commentCount + ' Comments</p>';
                html += '</li>';
            });
            html += '</ul>';
            $paneTarget.find('ul').replaceWith(html);
            $paneTarget.scrollTo(width);
            $paneTarget.fadeTo('fast', 1);


            //if the querystring contains 'data' key then create/show the menu
            if (ajaxData.indexOf('data') != -1) {
                
                html = '<ul>';
                $.each(data.menu, function(i, item) {
                    var selected = parseInt(item.selected);

                    var start = selected - 2;
                    var end = selected + 2;

                    if (start <= 0) {
                        start = 1;
                        end = 5;
                    }

                    html += '<li>';
                    html += '<li class="showing">Showing <strong>' + item.showing + '</strong> of ' + item.total + ' comments</li>';
                    if (item.newest === 'true') {
                        html += '<li><a href="target=all&data=1" title="newest"><< Newest</a></li>';
                        html += '<li><a href="target=all&data=3" title="previous">< Previous</a></li>';
                    }
                    html += '<li>...</li>';

                    html += '<li><a href="target=all&data=2" title="21-30">2</a></li>';
                    html += '<li><a href="target=all&data=3" title="31-40">3</a></li>';
                    html += '<li class="selected">4</li>';
                    html += '<li><a href="target=all&data=5" title="51-60">5</a></li>';
                    html += '<li><a href="target=all&data=6" title="61-70">6</a></li>';

                    html += '<li>...</li>';
                    if (item.oldest === 'true') {
                        html += '<li><a href="target=all&data=5" title="next">Next ></a></li>';
                        html += '<li><a href="target=all&data=oldest" title="oldest">Oldest >></a></li>';
                    }
                    html += '</li>';
                });
                html += '</ul>';
                $pagination.find('ul').replaceWith(html);
                if ($pagination.is(':hidden')) {
                    $pagination.fadeIn('fast');
                }
            } else {
                $pagination.hide();
            }
        });
    }


    function getComments(ajaxData) {
        $.ajax({
            type: "POST",
            url: "servlet.php",
            data: ajaxData,
            success: function(response) {
                //alert(response);
                var animated;
                var id = setInterval(function() {
                    animated = $paneTarget.is(':animated'); //check to see if the fade to nothing has finished
                    if (!animated) {
                        clearInterval(id);
                        $paneTarget.find('ul').replaceWith(response);
                        $paneTarget.scrollTo(width);
                        $paneTarget.fadeTo('fast', 1);
                    }
                }, 200)
            }
        }); /*AJAX end*/
    } //getComments()

});