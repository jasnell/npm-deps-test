
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

exports.run = function(name, test, out, err, callback) {
  var checkout = spawn('git', ['clone', test.git], { cwd: 'out' });
  console.log('Checking out '+name+'...');
  checkout.on('close', function(code) {
    var npm_update = spawn('npm', ['install'], {
      cwd: 'out/' + name
    });
    npm_update.on('close', function(code) {
      if (code === 0) {
        var npm_test = test.custom ?
          exec(test.custom, {cwd: 'out/' + name }) :
          spawn('npm', ['test'], {cwd: 'out/' + name }) ;
        console.log('Running tests for ' + name);
        npm_test.stdout.on('data', function(data) {
          out.write(data);
        });
        npm_test.stderr.on('data', function(data) {
          err.write(data);
        });
        npm_test.on('close', function(code) {
          callback();
        });
      } else {
        console.log('error running npm install for ' + name);
      }
    });
  });
};
