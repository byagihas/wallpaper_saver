'use strict';

const fs = require('fs');
const request = require('request');
const wallpapers = require('./wallpapers.json');

let ISODate = new Date().toISOString();
let downloadDate = ISODate.substring(0,ISODate.indexOf('T'));

let req_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
};

// Function: getWallpapers()
// Retrieve wallpapers from r/wallpapers
// parameters: subreddit - subreddit to search for recipes
const downloadWallpapers = async () => {
    let outfile = fs.createWriteStream(`rddt_topwp_${downloadDate}.jpg`);
    await new Promise((resolve, reject) => {
        request({
            uri: wallpapers[0],
            headers: req_headers,
            method: 'GET',
            gzip : 'true'
        })
        .pipe(outfile)
        .on('finish', () => {
            console.log(`File downloaded.`);
            resolve();
        })
        .on('error',(error) => {
            let err = new Error(error);
            reject(err);
        });
    })
    .catch(error => {
        let err = new Error(error);
        console.log(`Error: ${err}`);
    });
};
// getting wallpapers from r/wallpapers
module.exports = downloadWallpapers;