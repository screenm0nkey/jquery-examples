/*
 * Comment out the optimize line if you want
 * the code minified by Closure Compiler using
 * the "simple" optimizations mode
 */
({
    appDir: "../",
    baseUrl: "js/",
    dir: "../../../minified-site",
	//optimize: "none",

    paths: {
        "jquery": "libs/jquery-1.4.2.js"
    },

    modules: [
        {
            name: "main"
            //exclude: ["jquery"]
        }
    ]
})
