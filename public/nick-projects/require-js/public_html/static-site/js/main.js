require({},["jquery","plug-ins/jquery.plugin-one", "plug-ins/jquery.plugin-two", "plug-ins/jquery.plugin-currys"], function($) {
  require.ready(function () {
    console.log('nick');
  });
  
  jQuery(function () {
    //called when DOM is loaded
    jQuery('body').one().two();
    console.log('Hello');
  });
});
/*
 * In the require() call, "jquery" was referenced as a dependency.
 * The require-jquery.js file has special code in it to register jQuery as a RequireJS module,
 * and since it is registered as a module, you can get a handle on that module as the first
 * argument to the function callback passed to require. In the above example, $ is used to reference the jQuery module.
 */