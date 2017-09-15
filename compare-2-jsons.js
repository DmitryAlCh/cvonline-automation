const chalk = require('chalk');
const {diff} = require('just-diff');

async function compareJsons(localJson, eJson) {
  return new Promise ((resolve, reject) => {
    let diffObj = diff(localJson, eJson);
    diffObj = diffObj.filter((element) => element.op ==='add');
    console.log(diffObj);
    diffObj = diffObj.map((element) => element.value);

    if (diffObj.length < 1){
      console.log('No different entries found between 2 jsons');
      resolve(false);
    } else {
      resolve(diffObj);
    }
  });
}

module.exports = {
  compareJsons
}
