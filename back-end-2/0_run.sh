#!/bin/sh
pm2 start Nodejs-master/main.js --watch
pm2 log

#npm install body-parser