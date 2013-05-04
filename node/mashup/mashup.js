var request = require('request');
var http = require('http');
var urlparse = require('url');
var util = require('util');

function sendError(resp, code, msg) {
  var o = { 'error': msg };
  resp.writeHead(code, {'Content-Type': 'application/json'});
  resp.end(JSON.stringify(o));
}

function geocode(postalcode, country, resp) {
  var url = util.format(
    'http://maps.googleapis.com/maps/api/geocode/json?address=%s&region=%s&sensor=false',
    postalcode, country);
  
  request(url, function(err, result, body) {
    if (err) {
      sendError(resp, 400, 
                util.format('Error response %s from geocoding web service', err.message));
      return;
    }
    
    var geoResponse = JSON.parse(body);
    if (geoResponse.status !== 'OK') {
      sendError(resp, 500, 'Invalid geocode response');
    } else {
      getAltitude(geoResponse.results[0].geometry.location.lat,
                  geoResponse.results[0].geometry.location.lng, resp);
    }
  });
}

function getAltitude(lat, lng, resp) {
   var url = util.format(
     'http://maps.googleapis.com/maps/api/elevation/json?locations=%s,%s&sensor=false',
     lat, lng);

   request(url, function(err, result, body) {
     if (err) {
        sendError(resp, 400, 
        util.format('Error response %s from elevation web service', err.message));
        return;
     }
     
     var altResponse = JSON.parse(body);
       if (altResponse.status !== 'OK') {
         sendError(resp, 500, 'Invalid altitude response');
       } else {
         makeResponse(lat, lng, altResponse.results[0].elevation, resp);
       }
    });
}

function makeResponse(lat, lng, altitude, resp) {
  var o = { 'latitude': lat, 'longitide': lng,
            'altitude': altitude };
  resp.writeHead(200, {'Content-Type': 'application/json'});
  resp.end(JSON.stringify(o));
}

var svr = http.createServer(function(req, resp) {
  var parsed = urlparse.parse(req.url, true);
  if (!parsed.query.postalcode) {
    sendError(resp, 400, 'Missing query parameter "postalcode"');
  } else if (!parsed.query.country) {
    sendError(resp, 400, 'Missing query parameter "country"');
  } else {
    geocode(parsed.query.postalcode, parsed.query.country, resp);
  }
});

svr.listen(9000, function() {
  console.log('Node Mashup sample app is running on port 9000');
});


