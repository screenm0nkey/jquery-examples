$.fn.pause = function (n) {
	console.log(this);
    return this.queue(function () {
        var el = this;
        setTimeout(function () {
            return $(el).dequeue();
        }, n);
    });
};

$(document).ready(function () {
    setInterval(function () {
        $('#counter').html('Animations to go: ' + $('.box').queue().length);
    }, 10);

    $('input').click(function () {
        $('.box').animate({
            height : 20
        }, 'slow')
        .animate({
            height : 150
        }, 'slow')
        .animate({
            left: '+=100',
            top: '+=100'
        }, 200)
        .queue(function () { //queue inserts the function into the fx queue and then stops it.
            $('#title').html("We're in the animation, baby!");
            $(this).dequeue(); //dequeue starts fx going again.
        })
        .pause(2000)
        .animate({
            top: 0
        }, 200)
        .animate({
            height: 5
        })
        .animate({
            height: 150
        });

    });

});