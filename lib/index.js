require('localenv');
var exec = require('exec');
var Twitter = require('twitter');
var through2 = require('through2');
var Readable = require('stream').Readable;

var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var params = { track: process.env.TWITTER_KEYWORD };

var lastTweet = {};
var filterTweets = through2.obj((tweet, enc, cb) => {
    // Ignore spam
    if(tweet.text === lastTweet.text) {
        return cb(null);
    }

    lastTweet = tweet;

    if(tweet.retweeted_status || // Ignore retweets
    !tweet.entities || // Ignore non-photo tweets
    !tweet.entities.media ||
    !tweet.entities.media[0] ||
    tweet.entities.media[0].type !== 'photo') {
        return cb(null);
    }

    cb(null, tweet);
});


client.stream('statuses/filter', params, (stream) => {
    stream = new Readable({ objectMode: true }).wrap(stream)

    .pipe(filterTweets)

    .pipe(through2.obj(function(tweet, enc, cb) {
        this.push(tweet.text + '\n');

        var cmd = `curl ${tweet.entities.media[0].media_url} 2> /dev/null | tesseract stdin stdout 2> /dev/null | head -n 1`;

        exec(cmd, (err, out) => {
            // Grep the line for a battery %
            var match = out.match(/(\d{1,3})%/);

            if(!match) return cb(null, 'No percentaged received from OCR. Ignoring tweet.\n\n');

            if(match[1] > Number(process.env.BATTERY_THRESHOLD)) {
                return cb(null, `Battery is too high (${match[0]}). Ignoring tweet.\n\n`);
            }

            var mentions = '';
            if(tweet.entities.user_mentions) {
                mentions = tweet.entities.user_mentions.map((mention) => '@' + mention.screen_name);
                mentions += ' '
            }

            var status = `@${tweet.user.screen_name} ${mentions}${process.env.REPLY_TEXT}`;
            var params = { status, in_reply_to_status_id: tweet.id_str };

            client.post('statuses/update', params, (err) => {
                if(err) {
                    console.error(err);
                    return;
                }
                return cb(null, `Battery was low (${match[0]}). Replied to tweet\n\n`);
            });
        });

    }))

    .pipe(process.stdout)

    .on('error', err => console.error(err));
});