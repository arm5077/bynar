module.exports = function(callback){
  
  // Assign content of Bynar file to output code (this will almost certainly change or be moved)
  outputCode = content;
  
  // Check if the user specified a file to push output towards
  if(opts.outputFile){
    try {
      fs.writeFileSync(opts.outputFile, outputCode)
    }
    catch(e){
      return callback(`Couldn't write to ${opts.outputFile} because of this : '${e}'`)
    }
    
    console.log(chalk.cyan(`Successfully wrote to ${opts.outputFile}!`));
    callback();
  }
  
  // Otherwise, just output to terminal
  console.log(outputCode); 
}