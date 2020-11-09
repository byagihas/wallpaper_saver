'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const https = require('https');
const request = require('request');
const request_promise = require('request-promise');
const querystring = require('querystring');
const accessToken = require('./token.json');
const token = accessToken.access_token;

console.log("Token retrieved: " + token);

let req_headers = {
    'Authorization' : 'bearer ' + token,
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0'
};

// Function: getWallpapers()
// Retrieve wallpapers from r/wallpapers
// parameters: subreddit - subreddit to search for recipes
const getWallpapers = (subreddit) => {
    let limit = '1';
    let sorttype = 'top';
    let timeinterval = 'day';
    let reddit_api_url = `https://reddit.com/r/${subreddit}.json?limit=${limit}&sort=${sorttype}&t=${timeinterval}`;

    let wallpapers = [];
    var image_url;
    request_promise({uri: reddit_api_url, headers: req_headers, method: 'GET'}, (error, response) => {
        const body_parsed = JSON.parse(response.body);
        image_url = body_parsed.data.children;
        for(let i=0;i<image_url.length;i++){
            wallpapers.push(image_url[i].data.url_overridden_by_dest);
        };
    }).then(() => {
        fs.writeFileSync(__dirname + '/wallpapers.json', JSON.stringify(wallpapers));
        console.log('File written to: ' + __dirname + '/wallpapers.json');
    });
};

// getting wallpapers from r/wallpapers
getWallpapers('wallpapers');