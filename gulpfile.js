var gulp = require('gulp');
var debug = require('gulp-debug');
var fileSystem = require('fs');
var readLine = require('readline');
// var path = require('path');
var EOL = require('os').EOL;

// file paths
var CODEPOINTS = __dirname + '/fonts/codepoints';
var MAP_FILE_NAME = __dirname + '/scss/_icons.scss';

gulp.task('map', function() {
	// Create a file streaming interface
	var readLineHandle = readLine.createInterface({
		input: fileSystem.createReadStream(CODEPOINTS),
		output: process.stdout,
		terminal: false
	});

	// Read each line by line from the file codepoints file
	var map = '';
	readLineHandle.on('line', function(line) {
	  // Match the name, space then any unicode after it
	  var nameCodepointPair = line.split(' ');

	  // make css class prefix
	  var codepoint = nameCodepointPair[1];
	  var name = nameCodepointPair[0].toLowerCase().trim()
	      .replace(/[^0-9a-z]+/gi, '-')

	  // make the css
	  map += '.#{$gmi-css-prefix}-' + name + ':before { content: "\\' + codepoint + '"; }' + EOL;
	});

	readLineHandle.on('close', function() {
	  // Once reading has finished here we can write the file
	  fileSystem.writeFileSync(MAP_FILE_NAME, map);
	  // callback();
	});
});

gulp.task('default', function(){
});