## "Hello" Apigee Node.js Sample Proxy Bundle

This sample shows how to integrate a Node.js script into an API proxy. This application simply prints out "Hello, World!".

To deploy:

    apigeetool deployproxy -u USERNAME -p PASSWORD \
      -o ORG -e test -n hello -d .
      
Where:

* USERNAME: Your Apigee user name
* PASSWORD: Your Apigee password
* ORG: Your Apigee organization name

To run:

    curl http://ORG-test.apigee.net/hello

