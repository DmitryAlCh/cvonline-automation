const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');

const {getPage} = require('./get-request');
const {htmlToJson} = require('./parsing');

const uri = 'http://www.cv.lv/darba-sludinajumi/q-node.js';

wrapper = async (uri) => {
  const rawPage = await getPage(uri);
  const jobList = await htmlToJson(rawPage);
  console.log(JSON.stringify(jobList,2,2));
};

wrapper(uri);

// getPage(uri);
