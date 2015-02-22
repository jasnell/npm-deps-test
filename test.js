var fs = require('fs');
var rmdir = require('rimraf').sync;
var tests = require('./tests.json');

var test_harness = require('./test_harness');

var keys = Object.keys(tests);

(function run(name) {
  var test = tests[name];
  if (!test.skip) {
    var out = fs.createWriteStream('out/' + name + '-rpt');
    test_harness.run(
      name,
      test,
      out,
      out,
      function() {
        out.close();
        if (keys.length > 0) {
          process.nextTick(function() {
            run(keys.shift());
          });
        } else console.log('Done!');
      });
  } else {
    if (keys.length > 0) {
      process.nextTick(function() {
        run(keys.shift());
      });
    } else console.log('Done!');
  }
})(keys.shift());
