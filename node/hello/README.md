# "Hello" Apigee Node.js Sample

This application simply prints out "Hello, World!"

To deploy:

    apigeetool deploynodeapp -u USERNAME -p PASSWORD \
      -o ORG -e test -n hello -d .
      -m server.js -b /hello
      
Where:

* USERNAME: Your Apigee user name
* PASSWORD: Your Apigee password
* ORG: Your Apigee organization name

To run:

    curl http://ORG-test.apigee.net/hello

