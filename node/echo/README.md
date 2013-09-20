# "Echo" Apigee Node.js Sample

This application is an echo service that responds with a JSON object that describes the incoming request.
    
To deploy:

    apigeetool deploynodeapp -u USERNAME -p PASSWORD \
      -o ORG -e test -n echo -d .
      -m server.js -b /echo
      
Where:

* USERNAME: Your Apigee user name
* PASSWORD: Your Apigee password
* ORG: Your Apigee organization name

To use:

    curl -X POST \
         -H "Test-Header: 123" \
         -d "Hello, world!" \
         "http://ORG-test.apigee.net/echo/some/path?foo=bar"
