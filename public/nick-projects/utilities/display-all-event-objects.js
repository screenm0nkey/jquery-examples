//displays all elements with events attached, the event type and the function
$('*').each(function(){
    var evt = $(this).data('events'), 
		thes = this;
    if (evt) {
        $.each(evt, function(i, evtObj){
            console.log(thes, '\n', evtObj[0].type, '\n', evtObj[0].handler.toString());
        });
    }
});