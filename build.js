var fs = require('fs');
var watchify = require('watchify');
var w = watchify('./validate.js');
w.bundle({
  standalone: 'Validate',
  debug: true
}).pipe(fs.createWriteStream(__dirname + '/bundles/bundle.js'));
w.on('file', function(file, id, parent) {
  console.log(file);
})
w.on('update', function(id) {
  w.bundle({
    standalone: 'Validate',
    debug: true
  }).pipe(fs.createWriteStream(__dirname + '/bundles/bundle.js'));
})
