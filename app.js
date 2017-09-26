const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');


const {getPage} = require('./get-request');
const {htmlToJson} = require('./parsing');
const {saveData} = require('./local-storage');
const {readLocal} = require('./read-local');
const {compareJsons} = require('./compare');
const {searchParams} = require('./keywords');
const {paginate} = require('./paginate');

const keyWords = ['inženieris', 'projektu', 'node.js', 'autocad'];


wrapper = async (element) => {
  var bothJsons = await itemsInJson (element.url, element.fileName);
  if (bothJsons){
      // console.log(bothJsons.onlineData);
      var newItems = compareJsons(bothJsons.localData, bothJsons.onlineData);
  } else {
      console.log(chalk.bold.yellow('skipping comapring JSONs this iteration'));
      var newItems = false;
  }
  if (newItems){
    console.log('NEW Position');
    console.log(newItems);
    saveData(bothJsons.localData.concat(newItems), element.keyword);
  } else {
    console.log(chalk.bold.yellow('Not saving any data this iteration'));
  }

}
itemsInJson = async (uri, fileName) => {
  const rawPage = await getPage(uri);
  // await paginate(uri);
  if (rawPage){
    return {
      localData: await readLocal(fileName),
      onlineData: await htmlToJson(rawPage)
    };
  } else {
    console.log(chalk.red('Either nothing found or error occured'));
    return false;
  }
};


let reqTimer = setInterval(function(){
  keyWords.forEach((element, index) => {
    setTimeout(function(){
      searchObj = searchParams(element);
      console.log(searchObj);
      wrapper(searchObj)}, 10000*index);
  });
}, 600000);

process.on('SIGINT', () => {
  console.log(chalk.red('Exiting program on Ctr+C'));
  console.log(chalk.green('clearing the setInterval'));
  clearInterval(reqTimer);
});
