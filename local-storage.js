const fs = require('fs');
const chalk = require('chalk');

async function saveData(JsonData, filename){
  console.log('Writing JsonData to file: ', chalk.green(filename+'.txt'));
  fs.writeFile(`${filename}.txt`,JSON.stringify(JsonData,2,2), (err) => {
    if (err) {
      console.log(chalk.red('error occured writing file'), err);
      return false;
    };
    console.log(chalk.green('File has been saved'));
    return;
  });
}

module.exports = {
  saveData: saveData
}
