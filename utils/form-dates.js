
// take this 2017.09.30. return this:
// 2017-09-30
makeFormat = (dateString) => {
  let corretcDateString = dateString.substr(1,10);
  corretcDateString = corretcDateString.replace(/[.+]/gi, '-');
  // console.log(corretcDateString);
  return corretcDateString;
}

// makeFormat(' 2017.09.30.');
module.exports = {
  formatDate: makeFormat
}
