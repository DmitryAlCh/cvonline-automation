const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');


const {getPage} = require('./get-request');
const {htmlToJson} = require('./parsing');
const {saveData} = require('./local-storage');
const {readLocal} = require('./read-local');
const {compareJsons} = require('./compare');
const {searchParams} = require('./utils/keywords');
const {paginate} = require('./paginate');

const keyWords = ['inženieris', 'projektu', 'node.js', 'autocad'];
const mainTimeOut = 30000; // in millisends;
const cleanUpTime = 0; // in milliseconds;


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
    saveData(bothJsons.localData.concat(newItems), element.fileName);
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
  console.log('Starting mainTimeOut: '+ chalk.green.bold(mainTimeOut)+' ms');
  keyWords.forEach((element, index) => {
    setTimeout(function(){
      searchObj = searchParams(element);
      console.log(searchObj);
      wrapper(searchObj)}, 10000*index);
  });
  // once several hours clean up messages with passed due dates

}, mainTimeOut);

cleanUpWrapper = async (fileName) => {

}
process.on('SIGINT', () => {
  console.log(chalk.red('Exiting program on Ctr+C'));
  console.log(chalk.green('clearing the setInterval'));
  console.log(chalk.green('May still finish some operations'));
  clearInterval(reqTimer);
});
