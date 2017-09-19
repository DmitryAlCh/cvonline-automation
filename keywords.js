// make a uri and fileNames
var baseUrl = 'http://www.cv.lv/darba-sludinajumi/q-';


function searchParams (keyword) {
  return {
    url:  baseUrl + encodeURIComponent(keyword),
    fileName: keyword+'.txt',
    keyword: keyword
  }
}

module.exports = {
  searchParams
}
