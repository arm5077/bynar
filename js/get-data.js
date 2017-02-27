module.exports = function(callback){
  
  // Add boilerplate Javascript
  outputScripts += `\nvar bynarGet, bynarData={};
  function request_get(url, name, callback) {
    bynarGet = new XMLHttpRequest();
    bynarGet.onreadystatechange = function(){ receive_get(name, callback) };
    bynarGet.open('GET', url);
    bynarGet.send();
  }

  function receive_get(name, callback) {
    if (bynarGet.readyState === XMLHttpRequest.DONE) {
      if (bynarGet.status === 200) {
        if(!name)
          bynarData = JSON.parse(bynarGet.responseText);
        else
          bynarData[name] = JSON.parse(bynarGet.responseText);
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
    outputScripts += `request_get("${opts.data}", "data", finalCallback);\n`;
  }
  // Otherwise, it's an object
  else {
    // Try to convert to JSON
    try {
      opts.data = JSON.parse(opts.data);
    }
    catch(e){
      return callback("There's a problem parsing the data URL JSON in the front matter. Are you sure you're supplying valid JSON?")
    }
    getScripts = '';
    Object.entries(opts.data).forEach( ([key, value]) => {
      if( getScripts == '' )
        getScripts = `request_get("${value}", "${key}", finalCallback)`
      else {
        getScripts = `request_get("${value}", "${key}", ${getScripts})`;
      }
    });
    outputScripts += getScripts;
  }
  
  outputScripts += "\nfunction finalCallback(){\n";
   
  callback();
  
}