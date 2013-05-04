var express = require('express');
var usergrid = require('usergrid');
var config = require('./config');

// Set up Express environment and enable it to read and write JavaScript
var app = express();
app.use(express.bodyParser());

// Initialize Usergrid

var ug = new usergrid.client({
    'orgName': config.organization,
    'appName': config.application,
    'clientId': config.clientId,
    'clientSecret': config.clientSecret,
    logging:    config.logging
});

var loggedIn = null;

// The API starts here

// GET / 

var rootTemplate = {
  'employees': { 'href': './employees' }
};

app.get('/', function(req, resp) {
    resp.jsonp(rootTemplate);
});

// GET /employees

app.get('/employees', function(req, res) {
    if (loggedIn === null) {
      logIn(req, res, getEmployees);
    } else {
      getEmployees(req, res);
    }
});

function getEmployees(req, res) {
    loggedIn.createCollection({ type: 'employees' }, function(err, employees) {
        if (err) {
          res.jsonp(500, {'error': JSON.stringify(err) });
          return;
        }
        
        var emps = [];
        while (employees.hasNextEntity()) {
          var emp = employees.getNextEntity().get();
          var e = { 'id': emp.id,
                    'firstName': emp.firstName,
                    'lastName': emp.lastName,
                    'phone': emp.phone };
          emps.push(e);
        }
        res.jsonp(emps);
    });
}

// POST /employees

app.post('/employees', function(req, res) {
    if (!req.is('json')) {
      res.jsonp(400, {error: 'Bad request'});
      return;
    }
    
    var b = req.body;
    var e = {
      'id': b.id,
      'firstName': b.firstName,
      'lastName': b.lastName,
      'phone': b.phone
    };
    
    if ((e.id === undefined) || (e.firstName === undefined) ||
        (e.lastName === undefined) || (e.phone === undefined)) {
      res.jsonp(400, {error: 'Bad request' });
      return;
    }
    
    if (loggedIn === null) {
        logIn(req, res, function() {
            createEmployee(e, req, res);
        });
    } else {
        createEmployee(e, req, res);
    }
});

function createEmployee(e, req, res) {
    var opts = {
        type: 'employees',
        name: e.id 
    };
    loggedIn.createEntity(opts, function(err, o) {
        if (err) {
            res.jsonp(500, err);
            return;
        }
        o.set(e);
        o.save(function(err) {
            if (err) {
              res.jsonp(500, err);
              return;
            }
            res.send(201);
        });
    });
}

// We need this for UserGrid authentication

function logIn(req, res, next) {
    console.log('Logging in as %s', config.username);
    ug.login(config.username, config.password, function(err) {
        if (err) {
          console.log('Login failed: %s', JSON.stringify(err));
          res.jsonp(500, {error: err});
          return;
        }
        
        loggedIn = new usergrid.client({
            'orgName' :  config.organization,
            'appName' :  config.application,
            'authType' : usergrid.AUTH_APP_USER,
            'token':     ug.token,
            logging:     config.logging
        });
        
        console.log("Got a token. I wonder when it expires? Let's guess.");
        
        // Go on to do what we were trying to do in the first place
        setTimeout(expireToken, config.tokenExpiration);
        
        next(req, res);
    });
}

function expireToken() {
    console.log('Getting rid of user authentication token');
    if (loggedIn !== null) {
        loggedIn.logout();
        loggedIn = null;
    }
}

// Listen for requests until the server is stopped

app.listen(9000);
console.log('Listening on port 9000');


