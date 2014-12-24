$(document).ready(function(){

    $.ajaxSetup({
        url: "/xmlhttp/",
        global: false,
        type: "POST"
    
    });
    
    
    $("#loading").ajaxStart(function(){
        $(this).show();
    });
    // .ajaxStart()
    // .ajaxStop()
    // .ajaxComplete()
    // .ajaxError()
    // .ajaxSuccess()
    // .ajaxSend()
    
    
    $('#submit').click(function(){
        var jqXHR = $.ajax({
            url: 'url',
            data: {}, // name=John&location=Boston
            type: 'GET', //POST 
            dataType: "script", // xml, json, script, html
            cache: false,
            async: false,
            timeout: 1000, // Set a local timeout (in milliseconds) for the request. This will override the global timeout
            processData: false,
            global: false,
            crossDomain: false,
            accepts: '', // tell the server what kind of response it will accept in return
            context: document.body,
            mimeType: '',
            passwordString: '',
            statusCode: {
                404: function(){
                    alert('page not found');
                }
            },
            dataFilter: function(data, type){
            },
            jsonpCallback: function(){
            },
            beforeSend: function(jqXHR, settings){
            },
            success: function(msg){
            },
            error: function(jqXHR, textStatus, errorThrown){
            },
            complete: function(jqXHR, textStatus){
            }
        });
        
        jqXHR.abort();
		
        // success is the same as done and maps to done 
        jqXHR.done(function(response){
            log('done');
        });
        jqXHR.success(function(response){
            log('success');
        });
        
        
        // error is the same as fail and maps to fail
        jqXHR.fail(function(response){
            log('fail');
        });
        jqXHR.error(function(response){
            log('error');
        });
        
        
        // complete callback is invoked reagrdless of the outcome
        jqXHR.complete(function(response){
            log('complete');
        });
    });
});
