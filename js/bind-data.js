module.exports = function(callback){
  // Grab all of content in {{}} tags
  var bindings = content.match(/{{(.*?)}}/g);

  // Cycle through 'em
  bindings.forEach(function(binding){
    var variable = binding.replace(/{/g,'').replace(/}/g,'').trim();
    var name = variable.replace('.', '').replace(/\[*.\]/,'') + new Date().getTime();
    outputScripts += `\ndocument.getElementById("${name}").innerHTML = bynarData.${variable};`
    content = content.replace(binding, `<span id="${name}"></span>`)
  })

  callback();
}