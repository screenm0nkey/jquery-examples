<?php include ("includes/conditionals.php"); ?>
<head>
    <title>HTML5 Homepage</title>
    <?php include ("includes/links.php"); ?>
    <style type="text/css">
        #square {
            top: 0;
            width: 100px;
            height: 150px;
            left: 315px;
            background: #ccc;
            position: absolute;
        }
        
        #carousel-container {
            width: 730px;
            height: 150px;
            overflow: hidden;
            margin: 285px auto 0;
            /* border: 1px solid #ccc; */
            position: relative;
        }
        
        #carousel {
            position: relative;
            top: 75px;
            left: 525px;
            z-index: 2;
            height: 75px;
            width: 838px;
            border: 0 solid red;
        }
        
        #carousel-clone {
            position: absolute;
            top: 75px;
            z-index: 100;
            height: 75px;
            left: 525px;
            width: 838px;
            border: 0 solid red;
        }
        
        #carousel-container li {
            display: inline;
            float: left;
            width: 75px;
            height: 75px;
            left: 0;
            top: 0;
            margin-left: 5px;
            margin-right: 5px;
        }
        
        #carousel-container li a {
            position: relative;
            display: block;
        }
        
        #carousel-container li a img {
            width: 75px;
            height: 75px;
            position: absolute;
        }
		.nav {
			position:absolute; top:100px;z-index:1000; left:250px;
		}
		.nav #next {
			position:absolute; left:430px;
		}
		#video-cover {
			position:absolute; width:600px; height:270px; left:190px; background:url(images/generic/background.jpg) no-repeat -350px 0; z-index:1000;
		}
    </style>
</head>
<body class="home">
    <div id="container">
        <?php include ("includes/header.php"); ?>
        <div id="wrapper">
            <div class="nav">
                <a id="prev" href="prev">Previous</a>
                <a id="next" href="next">Next</a>
            </div>
            <div id="video-cover"></div>
            <div id="main">
                <div id="video">
                    <video width=320 height=240 data-filename="turdish">
                        <source src="videos/turdish.mp4" /><source src="videos/turdish.ogv" />
                    </video>
                    <video width=320 height=240 data-filename="fireworks">
                        <source src="videos/fireworks.mp4" /><source src="videos/fireworks.ogv" />
                    </video>
                    <video width=320 height=240 data-filename="peacefulpond">
                        <source src="videos/peacefulpond.mp4" /><source src="videos/peacefulpond.ogv" />
                    </video>
                    <video width=320 height=240 data-filename="california">
                        <source src="videos/california.mp4" /><source src="videos/california.ogv" />
                    </video>
                    <video width=320 height=240 data-filename="niagara">
                        <source src="videos/niagara.mp4" /><source src="videos/niagara.ogv" />
                    </video>
                    <video width=320 height=240 data-filename="clouds">
                        <source src="videos/clouds.mp4" /><source src="videos/clouds.ogv" />
                    </video>
                    <video width=320 height=240 data-filename="billysbrowser">
                        <source src="videos/billysbrowser.mp4" /><source src="videos/billysbrowser.ogv" />
                    </video>
                    <video width=320 height=240 data-filename="space">
                        <source src="videos/space.mp4" /><source src="videos/space.ogv" />
                    </video>
                </div>
            </div>
            <div id="carousel-container">
                <ul id="carousel">
                    <li>
                        <a href="turdish"><img src="svg-carousel/images/image01-col.svg.png" alt="turdish"></a>
                    </li>
                    <li>
                        <a href="fireworks"><img src="svg-carousel/images/image02-col.svg.png" alt="fireworks"></a>
                    </li>
                    <li>
                        <a href="peacefulpond"><img src="svg-carousel/images/image03-col.svg.png" alt="peacefulpond"></a>
                    </li>
                    <li>
                        <a href="california"><img src="svg-carousel/images/image04-col.svg.png" alt="california"></a>
                    </li>
                    <li>
                        <a href="niagara"><img src="svg-carousel/images/image05-col.svg.png" alt="niagara"></a>
                    </li>
                    <li>
                        <a href="clouds"><img src="svg-carousel/images/image06-col.svg.png" alt="clouds"></a>
                    </li>
                    <li>
                        <a href="billysbrowser"><img src="svg-carousel/images/image07-col.svg.png" alt="billysbrowser"></a>
                    </li>
                    <li>
                        <a href="space"><img src="svg-carousel/images/image08-col.svg.png" alt="space"></a>
                    </li>
                </ul>
                <div id="square"></div>
            </div>
        </div>
        <?php include ("includes/footer.php"); ?>
    </div>
    <?php include ("includes/scripts.php"); ?>
    <script src="js/libs/jquery/video-player-v3.js"></script>
    <script src="js/libs/jquery/scroller-v2.js"></script>
    <script type="text/javascript">
        (function(window, document, undefined){
            $(function(){
                $('#carousel-container').svgScroller({
                    triggerVideo: true,
                    moveCarousel: '85px',
                    nextDefaults: {
                        defaultLeft: '820px',
                        switchedLeft1: '252px',//changed
                        switchedLeft2: '-430px'//changed
                    },
                    previousDefaults: {
                        defaultLeft: '-767px',
                        switchedLeft2: '480px'//changed
                    }
                });
            });
            
            $('#video').videoPlayer({
                path: 'videos/',
                carouselMode: true
                //videoFiles:['fireworks', 'turdish01', 'peacefulpond']
            });
        })(jQuery, this, this.document);
    </script>
</body>
</html>
