const axios = require('axios');
const chalk = require('chalk');

async function getPage(uri){
  console.log('making axois request to: ',chalk.green(uri));
  let page = await axios.get(uri).catch((e) => {
      if (e.errno == 'ENOTFOUND') {
        console.log(chalk.red('Resource not found'));
        return false;
      }
  });

  if (page){
    return page.data;
  } else {
    return false;
  }
}

module.exports = {
  getPage: getPage
}
