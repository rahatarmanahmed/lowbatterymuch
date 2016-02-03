# lowbatterymuch
Twitter bot to tell people who post screenshots that their phones have low battery.

The way this works is it literally just downloads the image, runs OCR on the image, and checks if there's a percentage on the first line where the status bar might be. There's probably a lot of false positives and false negatives, but who cares?

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
