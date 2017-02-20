module.exports = function(callback){
  console.log(`Checking for front matter...`)
  var frontMatterPattern = new RegExp(/(?:---)([\s\S]*?)(?:---)/);
  var frontMatter = file.match(frontMatterPattern);
  
  if( !frontMatter )
    return callback('File has no Bynar front matter!');
  
  // Split front-matter into distinct arrays for each line and discard empty newlines
  frontMatter = frontMatter[1].split('\n').filter( d => d != '' );

  // Split each front-matter line into a key and a value and add to global opts variable
  frontMatter.forEach(line => {
    line = line.split(' = ')
    if(line.length == 1)
      line = line[0].split('=');
    opts[line[0]] = line[1];
  })

  // Remove front matter from file contents
  content = file.replace(frontMatterPattern, '');

  callback();
}