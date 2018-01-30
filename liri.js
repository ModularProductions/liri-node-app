require("dotenv").config();
var keys = require('./keys.js');

var Twitter = require('twitter');
var twitterClient = new Twitter(keys.twitter);
var params = {user_id: '958048067806253056'};

function myTweets() {
  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("");
      for (var i = 0; i < tweets.length; i++) {
        console.log("> "+tweets[i].text);
        console.log("Tweeted at "+tweets[i].created_at);
        console.log("");
      }
    }
  });
};

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function spotifyThis() { 
  function displaySong(res) {
    console.log("Artist: ", res.tracks.items[0].album.artists[0].name);
    console.log("Song: ", res.tracks.items[0].name);
    console.log("Album: ",res.tracks.items[0].album.name);
    console.log("Preview: ", res.tracks.items[0].preview_url);
    console.log("");
  };
  console.log("");
  if (process.argv[3] === undefined) {
    spotify.search({ type: 'track', query: 'the sign ace of base' })
    .then(function(response) { displaySong(response) }) // why does this work...
    .catch(function(err) {
      console.log(err);
    });
  } else {
    spotify.search({ type: 'track', query: process.argv[3] })
    .then(function(response) { displaySong(response) }) // why does this work...
    // .then(displaySong(response)) // and this does not? ("response is not defined")
    .catch(function(err) {
      console.log(err);
    });
  };
};

var request = require('request');

function movieThis() {
  request('http://www.omdbapi.com', function (error, response, body) {
    // console.log(response);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  });
};

var fs = require('fs');

function doWhat() {
  fs.readFile('./random.txt', 'utf8', function(err, data) {
    console.log("bleah");
    console.log(data);
  });
};

switch (process.argv[2]) {
  default : console.log("not a valid command. ? for list."); break;
  case "my-tweets" : myTweets(); break;
  case "spotify-this-song" : spotifyThis(); break;
  case "movie-this" : movieThis(); break;
  case "do-what-it-says" : doWhat(); break;
  case "?" : console.log("my-tweets | spotify-this-song '<song>' | movie-this '<movie>' | do-what-it-says")
};