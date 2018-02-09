require("dotenv").config();
var fs = require('fs');
var keys = require('./keys.js');

var Twitter = require('twitter');
var twitterClient = new Twitter(keys.twitter);
var params = {user_id: '958048067806253056'};

function myTweets() {
  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      logAndPrintThis("");
      for (var i = 0; i < tweets.length; i++) {
        logAndPrintThis("> "+tweets[i].text);
        logAndPrintThis("Tweeted on "+tweets[i].created_at);
        logAndPrintThis("");
      }
    } else {
      console.log("error retrieving Tweets =", error);
    }
  });
};

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function spotifyThis(arg) { 
  function displaySong(res) {
    logAndPrintThis("Artist: "+res.tracks.items[0].album.artists[0].name);
    logAndPrintThis("Song: "+res.tracks.items[0].name);
    logAndPrintThis("Album: "+res.tracks.items[0].album.name);
    logAndPrintThis("Preview: "+res.tracks.items[0].preview_url);
    logAndPrintThis("");
  };
  logAndPrintThis("");
  if (!arg) {arg = "the sign ace of base"};
  spotify.search({ type: 'track', query: arg })
  .then(function(response) { displaySong(response) })
  .catch(function(err) {
    console.log(err);
  });
};

var request = require('request');

function movieThis(arg) {
  if (!arg) {arg = "Mr. Nobody"};
  var queryURL = "http://www.omdbapi.com/?apikey="+keys.omdb+"&t="+arg;
  request(queryURL, function (error, response) {
    if (error) {console.log("Error retrieving OMDB data =", error)}
    else {
      res = JSON.parse(response.body);
      logAndPrintThis("");
      logAndPrintThis("Title: "+res.Title);
      logAndPrintThis("Year: "+res.Year);
      logAndPrintThis("IMDB Rating: "+res.Ratings[0].Value);
      logAndPrintThis("RT Rating: "+res.Ratings[1].Value);
      logAndPrintThis("Country: "+res.Country);
      logAndPrintThis("Language: "+res.Language);
      logAndPrintThis("Plot: "+res.Plot);
      logAndPrintThis("Starring: "+res.Actors);
      logAndPrintThis("");
    };
  });
};

function doWhat() {
  fs.readFile('./random.txt', 'utf8', function(err, data) {
    if (err) {
      console.log("Error reading random.txt =", err);
    } else {
      var com = data.split(',')[0];
      var arg = data.split(',')[1];
      if (com === "do-what-it-says") {
        logAndPrintThis("Nice try. Shall we divide by zero next?");
      } else {
      runCommand(com, arg);      
      }
    }
  })
};

function logAndPrintThis(data) {
  console.log(data);
  fs.appendFile("./log.txt", data+"\n", function(error) {
    if (error) {
      console.error("write error:  " + error.message);
    }
  });
};

function runCommand(com, arg) {
  switch (com) {
    default : logAndPrintThis("not a valid command. ? for list."); break;
    case "?" : console.log("my-tweets | spotify-this-song '<song>' | movie-this '<movie>' | do-what-it-says"); break;
    case "my-tweets" : myTweets(); break;
    case "spotify-this-song" : spotifyThis(arg); break;
    case "movie-this" : movieThis(arg); break;
    case "do-what-it-says" : doWhat(); break;
  };
};

runCommand(process.argv[2], process.argv[3]);