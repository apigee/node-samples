var http = require('http');

var server = http.createServer(function (req, resp) {
  var body = {
      origin: req.socket.remoteAddress,
      httpVersion: req.httpVersion,
      headers: req.headers,
      trailers: req.trailers,
      method: req.method,
      url: req.url
    },
    data = '';

  resp.writeHead(200, { 'Content-Type': 'application/json' });

  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    if (data) {
      body.data = data;
    }

    resp.end(JSON.stringify(body, null, 2));
  });

});

server.listen(9000, function () {
  console.log('The server is listening on port 9000');
});
