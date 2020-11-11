'use strict';

const getPosts = require('./getWallpaperPosts.js');
const downloadWallpaper = require('./downloadWallpapers.js');

const main = () => {
    const driver = async () => {
        // get 10 images from r/wallpapers
        let p = await getPosts('wallpapers', 20);
        let d = await downloadWallpaper(p);
        if(p) {
            return d;
        }
    };
    driver();
};

main();