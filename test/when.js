var Deferred = require('../basic-deferred.js');

var dummyFn = function(val, time, resolve) {
  var deferred = new Deferred();
  setTimeout(function() {
    resolve ? deferred.resolve(val) : deferred.reject(val);
  }, time);
  return deferred.promise();
};

var b = dummyFn(21, 2000, true);
var c = dummyFn(1000, 400, false);
var d = dummyFn(1400, 3000, true);
var e = dummyFn(5, 1500, true);

var deferred = new Deferred({verbose: true, processOnFail: true});
deferred.when(b, c, d, e)
  .then(function(b, c, d, e) {
    console.log(b, c, d, e);
  })
  .fail(function(b, c, d, e) {
    console.log("FAIL");
    console.log(b, c, d, e);
  });