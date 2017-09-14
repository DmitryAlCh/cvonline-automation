const cheerio=require('cheerio');
const chalk = require('chalk');

async function htmlToJson(rawHtml) {
  console.log('Filtering raw html with ', chalk.green('cheerio'));
  var list = [];
  var $ = cheerio.load(rawHtml);
  $('#table_jobs > tbody > tr').each(function (i, element){
    let link = $('.contentJobTitle', this).attr('href');
    let dates = $('.t_jobs_tech > p', this).text();
    let jobTitle = $('.contentJobTitle', this).text();
    let company = $('.contentCompanyName', this).text();
    list.push({
      jobTitle: jobTitle,
      company: company,
      link: link,
      dates: dates
    });
  });
  return list;
}

module.exports = {
  htmlToJson:htmlToJson
}
