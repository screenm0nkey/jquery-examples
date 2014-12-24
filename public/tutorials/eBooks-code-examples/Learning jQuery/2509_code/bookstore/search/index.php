<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" 
        "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Learning jQuery Fake Bookstore</title>
  <link rel="stylesheet" href="../styles/cookbook.css" type="text/css" media="screen" charset="utf-8" />
  <link rel="stylesheet" href="../styles/tables.css" type="text/css" media="screen" charset="utf-8" />
  <link rel="stylesheet" href="../styles/forms.css" type="text/css" media="screen" charset="utf-8" />
  <link rel="stylesheet" href="../styles/rotators.css" type="text/css" media="screen" charset="utf-8" />
  <script src="../../scripts/jquery.js"></script>
  <script src="../scripts/cookbook.js"></script>
  <script src="../scripts/tables.js"></script>
  <script src="../scripts/forms.js"></script>
  <script src="../scripts/rotators.js"></script>
</head>
<body>

  <div id="wrapper">
  	<div id="branding">
			<h1>Learning jQuery</h1>
  	</div>
  	<div id="container">
  		<div id="content">
  			<h2>Search Results</h2>
  			<p>Search results for: <?php print $_GET['search-text']; ?></p>

  			<ul>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  			</ul>
        
  	  </div> <!-- end content -->
  	</div> <!-- end container -->
    <div id="primary-nav">
  		<ul>
  			<li><a href="../../../../../Learning jQuery/2509_code/bookstore/authors">Authors</a></li>
  			<li><a href="../../../../../Learning jQuery/2509_code/bookstore/books">Books</a></li>
  			<li><a href="../../../../../Learning jQuery/2509_code/bookstore/news">News</a></li>
  			<li><a href="../../../../../Learning jQuery/2509_code/bookstore/contact">Contact</a></li>
  		</ul>    
    </div>
<div id="secondary-nav">
  			<h3><a href="../../../../../Learning jQuery/2509_code/bookstore/cart">Your Cart</a></h3>
  			<ul>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  				<li>Lorem ipsum dolor</li>
  			</ul>
  	</div> 

  	<div id="sidebar">

  			<h2>Sidebar</h2>
  			<form id="search" action="index.php" method="get" accept-charset="utf-8">
          <label for="search-text">search the site</label><input type="text" name="search-text" id="search-text" />
  			</form>
  			<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam adipiscing, risus quis fringilla venenatis, diam nisi adipiscing magna, sit amet rutrum risus nunc sit amet odio. Praesent ullamcorper. Donec sit amet ipsum. Nam consequat rhoncus lacus. Pellentesque libero erat, elementum a, mattis in, molestie id, magna. Integer sed libero vitae lacus elementum egestas. Nullam massa magna, gravida sed, porta vel, ultricies at, purus. Maecenas turpis. Vivamus ante risus, eleifend sed, scelerisque at, lacinia vitae, nunc. Vestibulum ut arcu. Cras ut magna. Pellentesque eleifend commodo est. Sed vitae odio eget ipsum tristique hendrerit. Cras elementum turpis ut sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut sed erat at velit bibendum varius. Sed venenatis sagittis lectus. Cras ligula felis, ultrices et, imperdiet et, laoreet sed, odio. Morbi nunc tellus, hendrerit in, aliquet eget, rutrum a, magna. Nunc nunc.</p>

  	</div> <!-- end sidebar -->
  	<div id="footer">
  		This is the footer.
  	</div>
  </div> <!-- end wrapper -->

</body>
</html>
