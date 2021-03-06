# Weather

[![NPM][npm-image]][npm-url]
![tests](https://github.com/MarshallAsch/weather/workflows/tests/badge.svg)
![linter](https://github.com/MarshallAsch/weather/workflows/linter/badge.svg)

Weather is a module for obtaining weather information.

## Installation

```bash
npm install weather-promise
```

## Usage

```javascript
const weather = require('weather-promise');

// Options:
// search: string           location name or zipcode
// degreeType: string       F or C (default: F)
// resCount: int            Maximum number of results (default: 1)

weather.find({search: 'San Francisco, CA', degreeType: 'F', resCount: 1}, function(err, result) {
  if(err) console.log(err);

  console.log(JSON.stringify(result, null, 2));
});
```
```bash
[
  {
    "location": {
      "name": "San Francisco, CA",
      "lat": "37.777",
      "long": "-122.42",
      "timezone": "-7",
      "alert": "",
      "degreetype": "F",
      "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
    },
    "current": {
      "temperature": "70",
      "skycode": "32",
      "skytext": "Sunny",
      "date": "2017-03-14",
      "observationtime": "13:15:00",
      "observationpoint": "San Francisco, California",
      "feelslike": "70",
      "humidity": "59",
      "winddisplay": "3 mph West",
      "day": "Tuesday",
      "shortday": "Tue",
      "windspeed": "3 mph",
      "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/32.gif"
    },
    "forecast": [
      {
        "low": "52",
        "high": "69",
        "skycodeday": "31",
        "skytextday": "Clear",
        "date": "2017-03-13",
        "day": "Monday",
        "shortday": "Mon",
        "precip": ""
      },
      {
        "low": "52",
        "high": "70",
        "skycodeday": "34",
        "skytextday": "Mostly Sunny",
        "date": "2017-03-14",
        "day": "Tuesday",
        "shortday": "Tue",
        "precip": "10"
      },
      {
        "low": "56",
        "high": "63",
        "skycodeday": "26",
        "skytextday": "Cloudy",
        "date": "2017-03-15",
        "day": "Wednesday",
        "shortday": "Wed",
        "precip": "20"
      },
      {
        "low": "50",
        "high": "64",
        "skycodeday": "28",
        "skytextday": "Mostly Cloudy",
        "date": "2017-03-16",
        "day": "Thursday",
        "shortday": "Thu",
        "precip": "10"
      },
      {
        "low": "53",
        "high": "67",
        "skycodeday": "32",
        "skytextday": "Sunny",
        "date": "2017-03-17",
        "day": "Friday",
        "shortday": "Fri",
        "precip": "10"
      }
    ]
  }
]
```

## Promises

The weather module also supports the use of promises instead of only using callbacks.
It uses the same function just leave out the callback.

```javascript
const weather = require('weather-promise');

// Options:
// search: string           location name or zipcode
// degreeType: string       F or C (default: F)
// resCount: int            Maximum number of results (default: 1)

weather.find({search: 'San Francisco, CA', degreeType: 'F', resCount: 1})
    .then(result => {
        console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
        if(err) console.log(err);
    });
```


## Notes

- It uses `weather.service.msn.com`

## License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

[npm-url]: http://npmjs.org/package/weather-promise
[npm-image]: https://badge.fury.io/js/weather-promise.svg
