<?php

$str = $_REQUEST["target"]; ;
$out =<<<EOT
		<ul>
			<li>8  $str</li>
			<li>9  $str</li>
			<li>10 $str</li>
			<li>1  $str</li>
			<li>2  $str</li>
			<li>3  $str</li>
			<li>4  $str</li>
			<li>5  $str</li>
			<li>6  $str</li>
			<li>7  $str</li>
			<li>8  $str</li>
			<li>9  $str</li>
			<li>10 $str</li>
			<li>1  $str</li>
			<li>2  $str</li>
		</ul>
EOT;

echo $out;
?>