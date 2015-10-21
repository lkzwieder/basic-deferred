# Basic deferred
Basic deferred is a deferred library builded with simplicity in mind.

### Installation
```sh
$ npm install basic-deferred
```

### Typical deferred function
```
var Deferred = require('basic-deferred');
function dummyFn(success) {
  var deferred = new Deferred();
  if(success) {
    deferred.resolve("Its allright!");
  } else {
    deferred.reject("Not okey");
  }
  return deferred.promise();
}
```
### Promise
The function must return the promise.
### Resolve
### Reject
### Done
### Fail
### When
### Then


### Done example
``` JavaScript
var Deferred = require('basic-deferred');

var dummyFn = function() {
  var deferred = new Deferred();
  setTimeout(function() {
    deferred.resolve("Hello world!");
  }, 2000);
  return deferred.promise();
};

dummyFn().done(function(res) {
  console.log(res);
});

// Hello world!
```

### Version
1.0.1