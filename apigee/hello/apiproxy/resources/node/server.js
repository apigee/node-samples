var http = require('http');

var svr = http.createServer(function(req, resp) {
  resp.writeHead(200, { 'Content-Type': 'text/plain' });
  resp.end('Hello, World!\n');
});

svr.listen(9000, function() {
  console.log('The server is listening on port 9000');
});
