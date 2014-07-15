var express = require('express');
var http = require('http');
var bl = require('bl');
var cheerio = require('cheerio');
var app = express();
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

// render home page
app.get('/', function(req, res) {
  res.render(__dirname + '/views/index.jade');
});

// process scrape request
app.get('/scrape', function(req, res) {
	console.log("Initiating scrape...");
	console.log("URL1: " + req.query.url1);
	console.log("URL2: " + req.query.url2);

	getPageHTML(req.query.url1, function (htmlString) {
		var $ = cheerio.load(htmlString);
		var cleanString = $("body").text();
		var words = cleanString.split(' ');
		var wordRanks = new Object();
		for (var i = 0; i < words.length; i++) {
			if (wordRanks[words[i]] == undefined) {
				wordRanks[words[i]] = 1;
			} else {
				wordRanks[words[i]] += 1;
			}
		}
		console.log(wordRanks);
	});

	// strip out html tags
	
	// split the string

	// iterate through the array and create rankings

	// rebase to 100

	function getPageHTML(url, callback) {
		http.get(url, function (stream) {
		  console.log("Got response: " + res.statusCode);
		  stream.pipe(bl(function (err, data) {
		  	if (err) {
		  		return console.error("There was an error: ", err);
		  	}
		  	callback(data.toString());
		  }));
		}).on('error', function (err) {
		  console.log("Got error: " + err.message);
		});
	}

	res.send("blank");
});

// start the server
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});