var url = require('url'),
  argo = require('argo');

argo()
  .use(function(handle) {
    handle('request', function(env, next) {
      console.log(env);
      var method,
        parsedReqUrl;

      // Try the X-HTTP-Method-Override header
      // in Node.js, header names are lowercased
      if (env.request.headers['x-http-method-override']) {
        method = env.request.headers['x-http-method-override'];
        delete env.request.headers['x-http-method-override'];
      } else {
        // Try the method_override query parameter
        parsedReqUrl = url.parse(env.request.url, true);

        if (parsedReqUrl.query['method_override']) {
          method = parsedReqUrl.query['method_override'];

          // Remove the param from the request URL
          delete parsedReqUrl.query['method_override'];
          delete parsedReqUrl.search;
          env.request.url = url.format(parsedReqUrl);
        }
      }

      if (method) {
        env.request.method = method;
      }

      next(env);
    });
  })
  .target('http://httpbin.org')
  .listen(9000);
