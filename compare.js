const chalk = require('chalk');

compareJsons = (json1,json2) => {
  console.log('Comparing local data with online');
  let newItems = [];
  json2.forEach((element,index) => {
    let a = json1.some((item) => {
      return item.jobTitle === element.jobTitle;
    });
    if (a === false) {
      console.log(chalk.bgCyan.bold.yellow('found the new item in OnlineData: '), chalk.green(element.jobTitle));
      newItems.push(element);
    }
  });
  if (newItems.length>0){
    return newItems;
  } else {
    return false;
  }

};

module.exports = {
  compareJsons
}
