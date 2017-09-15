const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');


const {getPage} = require('./get-request');
const {htmlToJson} = require('./parsing');
const {saveData} = require('./local-storage');
const {readLocal} = require('./read-local');
const {compareJsons} = require('./compare-2-jsons');

const keyword = `inženieris`;


const uri = `http://www.cv.lv/darba-sludinajumi/q-${encodeURIComponent(keyword)}`;

wrapper = async () => {
  let bothJsons = await itemsInJson (uri);
  let newItems = await compareJsons(bothJsons.localData, bothJsons.onlineData);
  if (newItems){
    console.log('NEW Position');
    console.log(newItems);
    saveData(bothJsons.localData.concat(newItems), keyword);
  }

}
itemsInJson = async (uri) => {
  const rawPage = await getPage(uri);
  if (rawPage){
    return {
      localData: await readLocal(`${keyword}.txt`),
      onlineData: await htmlToJson(rawPage)
    };
  } else {
    console.log(chalk.red('Either nothing found or error occured'));
    return false;
  }
};
wrapper();
