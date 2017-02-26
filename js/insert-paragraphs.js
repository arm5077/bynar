module.exports = function(callback){
  
  var tag = 0;
  
  lines = content.split('\n');
  lines = lines.map(function(line){
    
    if(line == '')
      return line

    // Detect Liquid-style tags 
    if( line.trim().indexOf('{%') == 0 ){
      tag = true;
      return line;
    }

    if( line.trim().indexOf('%}') == line.trim().length - 1 ){
      tag = false
    }
    else {
      if(!tag)
        line = `<p>${line}</p>`;
    }
    
    return line;
  })
  
  content = lines.join('\n');
  callback();
}