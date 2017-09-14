const axios = require('axios');
const chalk = require('chalk');

async function getPage(uri){
  console.log('making axois request to: ',chalk.green(uri));
  const page = await axios.get(uri).catch((e) => {console.log(e)});
  if (page){
    return page.data;
  } else {
    return false;
  }
}

module.exports = {
  getPage: getPage
}
