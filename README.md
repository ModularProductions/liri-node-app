# liri-node-app

## Purpose
Node application which performs a variety of actions dictated by the first argument, some of which will also accept a second argument as a search query. All results will log to console as well as append to 'log.txt'.

## Usage
### .env setup

Your API keys should be set as environment variables, located your '.env' file, which 'keys.js' will reference. Your '.env' file should contain this:

```
TWITTER_CONSUMER_KEY=<your key>
TWITTER_CONSUMER_SECRET=<your key>
TWITTER_ACCESS_TOKEN_KEY=<your key>
TWITTER_ACCESS_TOKEN_SECRET=<your key>
SPOTIFY_ID=<your key>
SPOTIFY_SECRET=<your key>
OMDB_API_KEY=<your key>
```

### Functions as Arguments
- my-tweets : Returns the last twenty Tweets some idiot vomited out.
- spotify-this-song "<query>" : Calls the Spotify API to return some information about the queried song. No argument defaults to your favorite tune.
- movie-this "<query>" : Calls the OMDB API to return some information about the queried movie. No argument defaults to your mom's favorite movie.
- do-what-it-says : Parses the 'random.txt' file to perform another action with query argument. For God's sake, don't edit 'random.txt' to include "do-what-it-says".

"?" may be passed as your function argument to return a list of valid function arguments.

*Ex.:* `node liri spotify-this-song "Strap Me Down"`
 