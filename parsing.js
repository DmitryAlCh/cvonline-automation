const cheerio=require('cheerio');
const chalk = require('chalk');
const {formatDate} = require('./form-dates');

async function htmlToJson(rawHtml) {
  console.log('Filtering raw html with ', chalk.green('cheerio'));
  var list = [];
  var $ = cheerio.load(rawHtml);
  $('.cvo_module_offers_wrap > div').each(function (i, element){
    let link = $('h2 > a', this).attr('href');
    let issueDate = $('.offer_dates', this).children().first().attr('title');
    let dueDate = $('.offer_dates', this).children().last().attr('title');
    let jobTitle = $('h2', this).text();
    let company = $('.cvo_module_offer_meta > .offer-company', this).text();
    dueDate = formatDate(dueDate);
    list.push({
      jobTitle,
      company,
      link,
      // issueDate,
      dueDate
    });
  });
  return list;
}

module.exports = {
  htmlToJson:htmlToJson
}
