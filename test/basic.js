var Deferred = require('../basic-deferred');

var dummyFn = function(value, isSuccess, time) {
  var deferred = new Deferred();
  setTimeout(function() {
    isSuccess ? deferred.resolve(value) : deferred.reject("failed");
  }, time);
  return deferred.promise();
};

dummyFn("Marty Mc Fly!", true, 3000)
  .done(function(res) {
    console.log(res);
  })
  .fail(function(e) {
    console.log(e);
  });

dummyFn("Marty Mc Fly!", false, 2000)
  .done(function(res) {
    console.log(res);
  })
  .fail(function(e) {
    console.log(e);
  });