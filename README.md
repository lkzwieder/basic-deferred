# Basic deferred
Is the way to manage asynchronous calls. Basic deferred is a deferred library developed with simplicity in mind. Is a factory function that returns a chainable utility object with methods to register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function.

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

### Create the deferred object
The `new Deferred()` creates a new deferred object. The deferred object can be created with options in which we can set if we want information about which parameter was rejected and if we continue processing the parameters after one of them was rejected. By default `verbose` and `processOnFail` are false.

```
new Deferred({verbose: true, processOnFail: true})
```
* verbose: Indicates if you want information about which parameter was rejected in a `deferred.when()` function.
* processOnFail: If is true, it will process all parameters no matter if one was rejected.

A Deferred object starts in the pending state. Any callbacks added to the object with `deferred.then()`, `deferred.done()`, or `deferred.fail()` are queued to be executed later. Calling `deferred.resolve` transitions the Deferred into the resolved state and immediately executes any done callback that are set. In the same way, calling `deferred.reject` put Deferred into a failed state and immediately executes any fail callback.

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

There is one exception, `deferred.when`; here Deferred is going to wait until every single parameter changes to a resolved state and then will execute the "then" callback with all the responses.

``` JavaScript
var Deferred = require('basic-deferred');

var dummyFn = function(value, isSuccess, time) {
  var deferred = new Deferred();
  setTimeout(function() {
    isSuccess ? deferred.resolve(value) : deferred.reject("failed");
  }, time);
  return deferred.promise();
};

var a = dummyFn("Hello ", true, 3000); // 3 seconds
var b = dummyFn("Marty Mc Fly!", true, 1000); // 1 second
var c = dummyFn(", Welcome to 2015, sorry we don't have hoverboards yet!", true, 5000); // 5 seconds

var deferred = new Deferred();
deferred.when(a, b, c)
  .then(function(aRes, bRes, cRes) {
    console.log(aRes, bRes, cRes);
  })
  .fail(function() {
    console.log(arguments);
  });

// Hello Marty Mc Fly! Welcome to 2015, sorry we don't have hoverboards yet! (after 5 seconds).
```
 In the previous example, we manage all to result successfully, but what happens if we alter that and make `b` fail?
 The response will be fired by the fail callback:
 ```
 // { '0': undefined, '1': 'failed' }
 ```

What is that `undefined`?, the second param fails, and too soon. So the first never was processed and, because of that, is undefined. If we want to process all no matter what we can set to true the `processOnFail` option.

### Version
0.0.3