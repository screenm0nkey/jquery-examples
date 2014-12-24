(function($) {
	
	//tabs
	var tweetbox = $("#tweetbox"),
		tweetData = null,
		friendData = null,
		followData = null;

	tweetbox.find("#tools a").click(function(e) {
		e.preventDefault();
		
		var link = $(this),
			target = link.attr("href").split("#")[1];

		tweetbox.find(".on").removeClass("on");
		link.addClass("on");
		
		tweetbox.find("#feed > div").hide();
		tweetbox.find("#" + target).show();
	});
	
	//format date
	convertDate = function(obj, i) {
		
		//remove time zone offset in IE
		if (window.ActiveXObject) {
			obj[i].created_at = obj[i].created_at.replace(/[+]\d{4}/, "");
		}
		
		//pretty date in system locale
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			date = new Date(obj[i].created_at),
			formattedTimeStampArray = [days[obj[i].created_at], date.toLocaleDateString(), date.toLocaleTimeString()];
			
		return formattedTimeStampArray.join(" ");
	}
	
	//format text
	breakTweet = function(obj, i) {

		//atify
		var text = obj[i].text,
			brokenTweet = [],
			atExpr = /(@[\w]+)/;

		if (text.match(atExpr)) {
			var splitTweet = text.split(atExpr);
			
			for (var x = 0, y = splitTweet.length; x < y; x++) {

				var tmpObj = {};
				
				if (splitTweet[x].indexOf("@") != -1) {
					tmpObj["twitname"] = splitTweet[x];
				} else {
					tmpObj["tweet"] = splitTweet[x];
				}
				
				brokenTweet.push(tmpObj);
				console.log(tmpObj);
			}
		} else {
			var tmpObj = {};
			tmpObj["Text"] = text;
			brokenTweet.push(tmpObj);	
		}
		
		
		return brokenTweet;
	}
	
	//ajax defaults
	$.ajaxSetup({
		dataType: "jsonp"
	});
	
	//get twitter data
	function getTweets() {
		return $.ajax("http://api.twitter.com/statuses/user_timeline/danwellman.json", {
			success: function(data) {
				
				//get first 5 items
				var arr = [];
				
				for (var x = 0; x < 5; x++) {
					var dataItem = {};
					dataItem["tweetlink"] = data[x].id_str;
					dataItem["timestamp"] = convertDate(data, x);
					dataItem["twittext"] = breakTweet(data, x);
					arr.push(dataItem);
				}
				
				tweetData = arr;
			}
		});
	}
	function getFriends() {
		return $.ajax("http://api.twitter.com/1/statuses/friends/danwellman.json", {
			success: function(data) {
				
				//get first 5 items
				var arr = [];
				
				for (var x = 0; x < 5; x++) {
					var dataItem = {};
					dataItem["screenname"] = data[x].screen_name;
					dataItem["img"] = data[x].profile_image_url;
					dataItem["name"] = data[x].name;
					dataItem["desc"] = data[x].description;
					arr.push(dataItem);
				}
				
				friendData = arr;
			}
		});
	}
	function getFollows() {
		return $.ajax("http://api.twitter.com/1/statuses/followers/danwellman.json", {
			success: function(data) {
				
				//get first 5 items
				var arr = [];
				
				for (var x = 0; x < 5; x++) {
					var dataItem = {};
					dataItem["screenname"] = data[x].screen_name;
					dataItem["img"] = data[x].profile_image_url;
					dataItem["name"] = data[x].name;
					dataItem["desc"] = data[x].description;
					arr.push(dataItem);
				}
				
				followData = arr;
			}
		});
	}
	
	//execute once all requests complete
	$.when(getTweets(), getFriends(), getFollows()).then(function(){
		console.log(tweetData)
		//apply templates
		tweetbox.find("#tweetTemplate").tmpl(tweetData).appendTo("#tweetList");
		tweetbox.find("#ffTemplate").tmpl(friendData).appendTo("#friendList");
		tweetbox.find("#ffTemplate").tmpl(followData).appendTo("#followList");
		
		//show tweets
		tweetbox.find("#tweets").show();
		
	});
})(jQuery);