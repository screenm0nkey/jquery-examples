<!DOCTYPE html>
<html>
    <head>
        <title>jQuery+RequireJS Sample Page</title>
        <?php
        	$ip = $_SERVER['REMOTE_ADDR'];
        	if (preg_match('/^(127\.|10\.)/', $ip)) {
        ?>
			<link rel="stylesheet" href="css/main.css">
        <?php
        }
        else {  
        ?>
			<link rel="stylesheet" href="css/main.min.css">
        <?php
        }
        ?>
    </head>
    <body>
        <h1><a href="http://requirejs.org/">http://requirejs.org/</a></h1>
        <h1><a href="http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth">http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth</a></h1>
        <h1>jQuery+RequireJS Sample Page</h1>
        <p>Look at source or inspect the DOM to see how it works.</p>
    </body>
</html>