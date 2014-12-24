<?php

$str = $_REQUEST["target"]; ;
$out =<<<EOT
		
({		
 	"title":"The lobbying boom",
	"entities": [{
		"3311":"Business Council for Sustainable Development UK",
		"2142":"Lord Hunt of Kings Heath",
		"3272":"BP plc",
		"3332":"World Business Council for Sustainable Development",
		"3270":"International Emissions Trading Association"
	}]
})
		
EOT;

echo $out;
?>