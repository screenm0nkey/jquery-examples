<?php

$str = $_REQUEST["target"]; ;
$out =<<<EOT
		<ul>
			<li class="showing">Showing <strong>41-50</strong> of 1008 comments</li>
			<li><a href="target=all&data=newest" title="newest"><< Newest</a></li>
			<li><a href="target=all&data=previous" title="previous">< Previous</a></li>
			<li>...</li>
			<li><a href="target=all&data=20" title="21-30">2</a></li>
			<li><a href="target=all&data=30" title="31-40">3</a></li>
			<li class="selected">4</li>
			<li><a href="target=all&data=50" title="51-60">5</a></li>
			<li><a href="target=all&data=60" title="61-70">6</a></li>
			<li>...</li>
			<li><a href="target=all&data=next" title="next">Next ></a></li>
			<li><a href="target=all&data=oldest" title="oldest">Oldest >></a></li>
		</ul>
EOT;

echo $out;
?>