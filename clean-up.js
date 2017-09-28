const {readLocal} = require('./read-local');
const {saveData} = require('./local-storage');
const chalk = require('chalk');
const moment = require('moment');

cleanUp = async (fileName) => {
  console.log(chalk.bgGreen('Running cleanUp process'));
  let localData = await readLocal(fileName);
  let freshArray = [];
  let toDay = moment();

  if (localData.length>0){
    localData.forEach((element) => {
      let adDate = moment(element.dueDate);
      let remaining = moment(adDate-toDay).format('DD');
      if (Number.parseInt(remaining) <= 0){
        console.log(chalk.bgRed.black('This one to delete:'));
        console.log(chalk.bgYellow.blue(JSON.stringify(element,2,2)));
      } else {
        freshArray.push(element);
      }
    });
  }
  if (freshArray.length !== localData.length) {
    saveData(freshArray, fileName);
  } else {
    console.log(chalk.bgYellow.black('No need to save data after clean up'));
  }

}

cleanUp('./inženieris.txt');
