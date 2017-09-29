const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
const {cleanUp} = require('./clean-up');

async function readLocal(fileName){
  return new Promise ((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        console.log(chalk.red('Error while reading file', fileName));
        console.log(err);
        reject ([]);
      } else {
        console.log('Read the file: ',chalk.green(fileName));
        let actualData = cleanUp(JSON.parse(data));
        resolve(actualData);
      }
    });
  });

};

module.exports = {
  readLocal
}
