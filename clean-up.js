const chalk = require('chalk');
const moment = require('moment');

cleanUp = async (localData) => {
  console.log(chalk.bgGreen('Running cleanUp process'));
  let freshArray = [];
  let toDay = moment();
console.log('localData length=',chalk.bgRed(localData.length));
  if (localData.length>0){
    localData.forEach((element) => {
      let adDate = moment(element.dueDate);
      let remaining = adDate.diff(toDay);
      if (Number.parseInt(remaining) <= -86400000){
        console.log(chalk.bgRed.black('This one to delete:'));
        console.log(chalk.bgYellow.blue(JSON.stringify(element,2,2)));
      } else {
        freshArray.push(element);
      }
    });
  }
  if (freshArray.length !== localData.length) {
    console.log(chalk.bgYellow.black('Seme positions where clean out'));
    return freshArray;
  } else {
    console.log(chalk.bgYellow.black('No need to save data after clean up'));
    return freshArray;
  }

}



module.exports = {
  cleanUp
}
