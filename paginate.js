const cheerio=require('cheerio');
const chalk = require('chalk');

async function paginate(rawHtml) {
  console.log('Discovering how many pages are there with: ', chalk.green('cheerio'));
  var list = [];
  var $ = cheerio.load(rawHtml);
  console.log('pagination');
  console.log($('div > ul').text());
  console.log('pagination');
  console.log(list);
  return list;
}

module.exports = {
  paginate
}
