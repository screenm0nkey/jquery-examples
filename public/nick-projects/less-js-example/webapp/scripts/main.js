require({}, ["jquery", "less-1.0.41.min", "jquery.plugin-one", "jquery.plugin-two", "jquery.plugin-currys"], function($){
    $(function(){
        $('body').one().two();
        console.log('HELLO');
        less.env = "development";
       	less.watch();
    });
});

/*

 * In the require() call, "jquery" was referenced as a dependency.

 * The require-jquery.js file has special code in it to register jQuery as a RequireJS module,

 * and since it is registered as a module, you can get a handle on that module as the first

 * argument to the function callback passed to require. In the above example, $ is used to reference the jQuery module.

 */

