<?php 
  header('Content-Type: text/xml');
  print $feed = file_get_contents('http://jquery.com/blog/feed');
?>