require('localenv');
var exec = require('exec');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var params = { track: process.env.TWITTER_KEYWORD };

client.stream('statuses/filter', params, (stream) => {
    // God why isn't this a regular stream
    stream.on('data', tweet => {
        // Skip non image tweets
        if(!tweet.entities ||
        !tweet.entities.media ||
        !tweet.entities.media[0]) {
            return;
        }

        // Run command to dl image, run ocr, and return first line of result
        var cmd = `curl ${tweet.entities.media[0].media_url} 2> /dev/null | tesseract stdin stdout 2> /dev/null | head -n 1`;
        exec(cmd, (err, out) => {
            // Grep the line for a battery %
            var match = out.match(/(\d{1,2})%/);
            if(!match) return;
            if(match[1] > Number(process.env.BATTERY_THRESHOLD)) return;

            // TODO: Reply to
            var status = `@${tweet.user.screen_name} ${process.env.REPLY_TEXT}`;
            var params = { status, in_reply_to_status_id: tweet.id_str };

            client.post('statuses/update', params, (err) => {
                if(err) console.error(err);
            });
        });

    });
    stream.on('error', (err) => { throw err; });
});