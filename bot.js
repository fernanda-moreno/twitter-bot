// Fernanda Moreno
// LMC 2700: Intro to Computational Media
//Project 4: TwitterBot

// Twitter library
var Twit = require('twit');

// Configuration file
var T = new Twit(require('./config.js'));

var exec = require('child_process').exec;
var fs = require('fs');


function tweetIt() {
		var gtNouns = ["the CULC", "CS 1371", "Willage food", "Nav's lack of food", "the green route", "Skiles"];
		var gtPeople = ["Bud Peterson", "Buzz", "George P. Burdell"];
		var gtClasses = ["CS 1371", "LMC 2700", "CS 1331", "CS 1332", "Linear Algebra"];
		var gtPlaces = ["Howey", "the CULC", "Willage", "Nav", "Skiles"];
		var gtPlatforms = ["Mahara", "Canvas", "Courseoff"];
		var phraseArray = [ "what would " + chooseRandom(gtPeople) + " do?",
												"i wake up \n every morning \n at 8am \n naturally \n from stress",
												"why \n pay money \n to go inside \n a haunted house \n when \n you can take \n" + chooseRandom(gtClasses) + "\n and get scared \n for \n free?",
												"the only social interaction \n i get \n is with recruiters \n on phone \n interviews",
												"i don't want \n to be an \n engineer \n i just \n want \n to be \n pregnant",
												"it's spooky season \n especially \n for my \n grades",
												"programming \n is easy \n you just have to \n type words \n into a \n computer",
												"i can't sing \n but i can \n cry",
												"out of the total \n number \n of females \n i'm currenly in communication \n with \n the majority are \n recruiters",
												"how \n tf \n do you look a baby \n in the eyes \n and name it \n " + chooseRandom(gtPeople),
												"if you wanna be my lover, you gotta let me see your homework for " + chooseRandom(gtClasses),
												"Ahh " + chooseRandom(gtPlaces) + ", the best place to cry",
												"Trick or treating at " + chooseRandom(gtPlaces) + " > trick or treating at a haunted house",
												"Scariest thing about Tech? \n" + chooseRandom(gtNouns),
												"Shameless plug: please follow @gt_cm_ambassadors on Instagram!",
												"Adding her on Facebook < Adding her on " + chooseRandom(gtPlatforms)
		];
		function chooseRandom(myArray) {
	  		return myArray[Math.floor(Math.random() * myArray.length)];
		}
	var phrase = chooseRandom(phraseArray);
		var tweet = {
			status: phrase
		}

		T.post('statuses/update', tweet, tweeted);

		function tweeted(err, data, response) {
			if (err){
				console.log("Something went wrong with" + phrase);
			}	else {
				console.log("It worked!");
			}
		}
}

function tweetSqrl() {
	var cmd = 'processing-java --sketch=`pwd`/sqrl --run';

	exec(cmd, processing);

	function processing() {
		var filename = 'sqrl/white.jpg';
		var params = {
			encoding: 'base64'
		}

		var b64 = fs.readFileSync(filename, params);

		T.post('media/upload', { media_data: b64 }, uploaded);

		function uploaded(err, data, response) {
			var id = data.media_id_string;
			var tweet_pic = {
				status: "RT for good luck on your midterms!!",
				media_ids: [id]
			}
			T.post('statuses/update', tweet_pic, tweetedPic);
		}
		function tweetedPic(err, data, response) {
			if (err){
				console.log("Something went wrong ");
			}	else {
				console.log("It worked!");
			}
		}
	}
}

function tweetSixFlags() {
	var cmd = 'processing-java --sketch=`pwd`/sixflags --run';

	exec(cmd, processing);

	function processing() {
		var filename = 'sixflags/rsz_six.jpg';
		var params = {
			encoding: 'base64'
		}

		var b64 = fs.readFileSync(filename, params);

		T.post('media/upload', { media_data: b64 }, uploaded);

		function uploaded(err, data, response) {
			var id = data.media_id_string;
			var tweet_pic = {
				status: "Which ride at Six Flags is this?? 😫",
				media_ids: [id]
			}
			T.post('statuses/update', tweet_pic, tweetedPic);
		}
		function tweetedPic(err, data, response) {
			if (err){
				console.log("Something went wrong ");
			}	else {
				console.log("It worked!");
			}
		}
	}
}

var jacketsSearch = {q: "#gojackets", count: 10, result_type: "recent"};

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function retweetLatest() {
	T.get('search/tweets', jacketsSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

function runBot() {
	function chooseRandom(myArray) {
			return myArray[Math.floor(Math.random() * myArray.length)];
	}

	var rand = ["1", "2", "3", "4", "5", "6","7","8","9", "10", "11", "12", "13",
							"14", "15", "16", "17", "18", "19", "20"];
	var picOrTweet = chooseRandom(rand);

	if (picOrTweet == "1") {
		tweetSqrl();
	} else if (picOrTweet == "2") {
		tweetSixFlags();
	} else if (picOrTweet == "3"){
		retweetLatest();
	} else { // to give my composed tweets a better chance
		tweetIt();
	}
}

runBot();
//tweetSixFlags();
//retweetLatest();
//tweetPic();
//respondToCoughCough();
//tweetIt();
//respondToMention();
// Try to retweet something as soon as we run the program...
//retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
//setInterval(runBot, 1000 * 60);
