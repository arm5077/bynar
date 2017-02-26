module.exports = function(callback){
  
  // Add boilerplate Javascript
  outputScripts += `
  var get, data;
  function request_get(url, name, callback) {
    get = new XMLHttpRequest();
    get.onreadystatechange = function(){ receive_get(name, callback) };
    get.open('GET', url);
    get.send();
  }

  function receive_get(name, callback) {
    if (get.readyState === XMLHttpRequest.DONE) {
      if (get.status === 200) {
        if(!name)
          data = JSON.parse(get.responseText);
        else
          data[name] = JSON.parse(get.responseText);
      } else {
        console.log("Couldn't open URL")
      }
      if( callback )
        callback();
    }
  }
  `
  
  // Determine if the front matter data property is a URL or an object
  if(opts.data.indexOf('{') == -1){
    outputScripts += `request_get("${opts.data}", null, null);\n`;
  }
  // Otherwise, it's an object
  else {
    opts.data = JSON.parse(opts.data);
    getScripts = '';
    Object.entries(opts.data).forEach( ([key, value]) => {
      if( getScripts == '' )
        getScripts = `request_get("${value}", "${key}", null)`
      else {
        getScripts = getScripts += `request_get("${value}", "${key}", ${getScripts})`;
      }
    });
    outputScripts += getScripts;
  }
  
  console.log(outputScripts);
  callback();
  
}