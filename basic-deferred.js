exports.Deferred = function(verbose) {
  var _successStoreArr = [];
  var _failStoreArr = [];
  var _thenCount = null;
  var _doneCb;
  var _failCb;

  var _executeWhen = function(isSuccess, args, pos) {
    _thenCount--;
    args = args[pos] = args[0];
    delete args[0];
    if(isSuccess) {
      _successStoreArr.push(args);
    } else {
      _failStoreArr.push(args);
      if(verbose) console.log("The argument in the position number: " + pos + " has failed");
    }
    if(!_thenCount) {
      if(_successStoreArr.length) {
        _successStoreArr = Array.prototype.slice.call(_successStoreArr);
        _doneCb.apply(null, _successStoreArr);
      }
      if(_failStoreArr.length) {
        _failStoreArr = Array.prototype.slice.call(_failStoreArr);
        _failCb.apply(null, _failStoreArr);
      }
    }
  };

  var _execute = function(callback, args) {
    args = Array.prototype.slice.call(args);
    callback.apply(null, args);
  };

  var _done = function(callback) {
    _doneCb = callback;
    return this;
  };

  var _then = function(callback) {
    _doneCb = callback;
    return this;
  };

  var _fail = function(callback) {
    _failCb = callback;
    return this;
  };

  return {
    when: function() {
      var i = _thenCount = arguments.length;
      while(i--) {
        arguments[i].self.pos = i;
        arguments[i].self.resolve = function() {
          _executeWhen(true, arguments, this.pos);
        };
        arguments[i].self.reject = function() {
          _executeWhen(false, arguments, this.pos);
        };
      }
      return {then: _then, fail: _fail, done: _done};
    },
    resolve: function() {
      _execute(_doneCb, arguments);
    },
    reject: function() {
      _execute(_failCb, arguments);
    },
    promise: function() {
      return {done: _done, fail: _fail, self: this};
    }
  };
};