if (!self.Cache.prototype.add) {
  self.Cache.prototype.add = function add(request) {
    return this.addAll([request]);
  };
}
if (!self.Cache.prototype.addAll) {
  self.Cache.prototype.addAll = function addAll(requests) {
    var cache = this;

    function NetworkError(message) {
      this.name = 'NetworkError';
      this.code = 19;
      this.message = message;
    }
    NetworkError.prototype = Object.create(Error.prototype);

    return Promise.resolve().then(function() {
      if (arguments.length < 1) throw new TypeError();

      var sequence = [];

      requests = requests.map(function(request) {
        if (request instanceof Request) {
          return request;
        }
        else {
          return String(request);          }
      });

      return Promise.all(
        requests.map(function(request) {
          if (typeof request === 'string') {
            request = new Request(request);
          }

          return fetch(request.clone());
        })
      );
    }).then(function(responses) {
      return Promise.all(
        responses.map(function(response, i) {
          return cache.put(requests[i], response);
        })
      );
    }).then(function() {
      return undefined;
    });
  };
}
if (!self.CacheStorage.prototype.match) {
  self.CacheStorage.prototype.match = function match(request, opts) {
    var caches = this;
    return caches.keys().then(function(cacheNames) {
      var match;
      return cacheNames.reduce(function(chain, cacheName) {
        return chain.then(function() {
          return match || caches.open(cacheName).then(function(cache) {
              return cache.match(request, opts);
            }).then(function(response) {
              match = response;
              return match;
            });
        });
      }, Promise.resolve());
    });
  };
}
