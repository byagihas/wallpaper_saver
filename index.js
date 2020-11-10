'use strict';

const getPosts = require('./getWallpaperPosts.js');
const downloadWallpaper = require('./downloadWallpapers.js');

const main = async () => {
    const driver = async () => {
        let p = await getPosts();
        let d = await downloadWallpaper();
        if(p) {
            return d;
        }
    };
    driver();
};

main();