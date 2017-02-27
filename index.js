#!/usr/bin/env node

fs = require('fs'),
  program = require('commander'),
  async = require('async'),
  request = require('request'),
  chalk = require('chalk'),
  cheerio = require('cheerio');

var parseFrontMatter = require('./js/front-matter.js'),
  getData = require('./js/get-data.js')
  exportProductionCode = require('./js/export-production-code.js'),
  insertParagraphs = require('./js/insert-paragraphs.js'),
  bindData = require('./js/bind-data.js'),
  insertConditionals = require('./js/insert-conditionals.js'),
  insertLoops = require('./js/insert-loops.js');



file = null,
  content = null,
  opts = {},
  outputCode = "",
  outputScripts = "",
  outputScriptsAfterAJAX = null;

program.arguments('<filename>')
  .description('Concerts a Bynar markdown file to production-ready HTML/Javascript.')
  .option('-o --output, <outputFile>', 'Output to file')
  .action(function(filename, command){
   
    async.series([
      // Parse CLI arguments
      function(callback1){
        // Check if filename was specified
        if(filename){
          console.log(`Opening ${filename}...`)
          try {
            file = fs.readFileSync(filename, 'utf8')
          }
          catch(e){
            callback1(`Couldn't open ${filename}`);
            return
          }
        }
        else{
          callback1(`You didn't specify a file!'`)
          return
        } 
        console.log(chalk.cyan(`Opened and read ${filename}`));
        
        // See if an output file is specified
        if(program.output)
          opts.outputFile = program.output;
        
        callback1();
      },
      // Handle front matter
      parseFrontMatter,
      
      // Build download scripts for live data
      getData,
      
      // Add conditional statement tests
      insertConditionals,
      
      // Add loops
      insertLoops,
      
      // Insert paragraphs
      insertParagraphs,
      
      // Bind data
      bindData,
      
      // Close out after-AJAX callback in scripts
      function(callback){
        outputScripts += '\n}'
        callback();
      },
      
      // Export production code
      exportProductionCode
    ], 
    // Wrap this whole shebang up
    function(err){ 
      if(err) console.log(chalk.red(`Error: ${err}`));
    });
  })
  .parse(process.argv);
  
  // Display help if nothing is provided
  if(program.args.length == 0)
    program.help();