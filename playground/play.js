let keys = ['hsbajhsb','sssss','qqqqq','rrrrr'];

setInterval(function(){
  console.log(keys);
  keys.forEach((element, index)=>{
    setTimeout(()=>{
      console.log('Index: '+index + '; Value: '+element);
    }, 1000*index);
  });
},7000);
