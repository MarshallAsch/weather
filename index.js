/*
 * Weather
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

/* jslint node: true, sub: true */
'use strict';

const request = require('request-promise-native');
const qs      = require('querystring');
const xml2JS  = require('xml2js');


const xmlParser     = new xml2JS.Parser({charkey: 'C$', attrkey: 'A$', explicitArray: true});
const defResCount   = 1;
const defTimeout    = 10000;
const findUrl       = 'http://weather.service.msn.com/find.aspx';

function genObject(data, current, forcasts) {

    return {
      location: {
        name: data['weatherlocationname'],
        zipcode: data['zipcode'],
        lat: data['lat'],
        long: data['long'],
        timezone: data['timezone'],
        alert: data['alert'],
        degreetype: data['degreetype'],
        imagerelativeurl: data['imagerelativeurl']
        //url: data['url'],
        //code: data['weatherlocationcode'],
        //entityid: data['entityid'],
        //encodedlocationname: data['encodedlocationname']
      },
      current: generateCurrent(current, data['imagerelativeurl']),
      forecast: generateForcast(forcasts)
    };
}

function generateCurrent(current, url) {
    let cur = null;

    if(current instanceof Array && current.length > 0) {
      if(typeof current[0]['A$'] === 'object') {
        cur = current[0]['A$'];
        cur.imageUrl = url + 'law/' + cur.skycode + '.gif';
      }
    }

    return cur;
}

function generateForcast(forcasts) {
    if(forcasts instanceof Array) {
        return forcasts.filter(f => typeof f['A$'] === 'object').map(f => f['A$']);
    } else {
        return null
    }
}

function generateUrl(options) {
    return findUrl + '?' + qs.stringify({
            src: 'outlook',
            weadegreetype: options.degreeType || 'F',
            culture: options.lang || 'en-US',
            weasearchstr: options.search
        });
}

function validateOptions(options) {

    return new Promise((resolve, reject) => {
        if(!options || typeof options !== 'object')
          reject(new Error('invalid options'));

        if(!options.search)
          reject(new Error('missing search input'));

        resolve(options);
    });
}

function find(options, callback) {

    return validateOptions(options)
        .then(options => request.get({url: generateUrl(options), timeout: options.timeout || defTimeout}))
        .then(body => {

            if(!body) throw new Error('failed to get body content');

            // Check body content
            if(body.indexOf('<') !== 0) {
                if(body.search(/not found/i) !== -1) {
                    return [];
                }
                throw new Error('invalid body content');
            }

            // parse xml
            return xmlParser.parseStringPromise(body);
        })
        .then(res => {

            if (res instanceof Array) return res;

            if(!res || !res.weatherdata || !res.weatherdata.weather)  throw new Error('failed to parse weather data');

            let weather = res.weatherdata.weather;

            if(weather['A$'] && weather['A$'].errormessage) throw new Error(weather['A$'].errormessage);

            if(!(weather instanceof Array)) throw new Error('missing weather info');

            return weather.filter(w => typeof w['A$'] === 'object')
              .slice(0, options.resCount || defResCount)
              .map(w => genObject(w['A$'], w['current'], w['forecast']));
        })
        .then(results => {

            if(typeof callback === 'function') {
                callback(null, results);
            } else {
                return results;
            }
        })
        .catch (err => {

            if(typeof callback === 'function') {
                callback(err);
            } else {
                throw err;
            }
        });
}

module.exports = {
  find: find
};
