# "Method Override" Apigee Node.js Sample

This application is a proxy that changes the HTTP method sent to a target. If a `X-HTTP-Method-Override` header or `method_override` query parameter is specified in a request, its value will be used as the method instead of the original method, and the header or query parameter will be removed. (HTTPBin)[http://httpbin.org/] is the default back-end service.
    
To deploy:

    npm install
    apigeetool deploynodeapp -u USERNAME -p PASSWORD \
      -o ORG -e test -n method-override -d .
      -m server.js -b /method-override
      
Where:

* USERNAME: Your Apigee user name
* PASSWORD: Your Apigee password
* ORG: Your Apigee organization name

To use:

    curl -X GET \
         "http://ORG-test.apigee.net/method-override/post?method_override=POST"

    curl -X GET \
         -H "X-HTTP-Method-Override: POST" \
         -d "Hello, world!" \
         "http://ORG-test.apigee.net/method-override/post"
