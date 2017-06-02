# lowbatterymuch

[![Greenkeeper badge](https://badges.greenkeeper.io/rahatarmanahmed/lowbatterymuch.svg)](https://greenkeeper.io/)
Twitter bot retweet people who post screenshots of their phones with low battery.

The way this works is it literally just downloads the image, runs OCR on the image, and checks if there's a percentage on the first line where the status bar might be. There will be false negatives, but as long as we get some matches, it'll be fine. False positives may happen but are mostly mitigated by watching keywords that are most likely to only have pictures of phone screenshots.

## Setup

You'll need the following to run this:

 - tesseract: `brew install tesseract`
 - curl (sorry, windows)
 - head (sorry, windows)

Run `npm install`. Then `npm start` to run the bot.

## License
The MIT License (MIT)

Copyright (c) 2016 Rahat Ahmed

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
