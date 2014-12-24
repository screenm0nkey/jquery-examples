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
        "jquery": "libs/require+jquery-1.4.4"
    },

    modules: [
        {
            name: "main"
            //exclude: ["jquery"]
        }
    ]
})
