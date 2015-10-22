var Deferred = require('../basic-deferred');

var dummyFn = function(value, isSuccess, time) {
  var deferred = new Deferred();
  setTimeout(function() {
    isSuccess ? deferred.resolve(value) : deferred.reject("failed");
  }, time);
  return deferred.promise();
};

var a = dummyFn("Hello", true, 3000); // 3 seconds
var b = dummyFn("Marty Mc Fly!", false, 1000); // 1 second
var c = dummyFn("Welcome to 2015, sorry we don't have hoverboards yet!", true, 5000); // 5 seconds

var deferred = new Deferred();
deferred.when(a, b, c)
  .then(function(aRes, bRes, cRes) {
    console.log(aRes, bRes, cRes);
  })
  .fail(function() {
    console.log(arguments);
  });