# "Mashup" Apigee Node.js Sample

A mashup of the Google geocoding and altitude APIs. It gives you the
average altitude of any postal code in the world.
    
To deploy:

    npm install
    apigeetool deploynodeapp -u USERNAME -p PASSWORD \
      -o ORG -e test -n altitude -d .
      -m mashup.js -b /altitude
      
Where:

* USERNAME: Your Apigee user name
* PASSWORD: Your Apigee password
* ORG: Your Apigee organization name

To use:

    curl "http://ORG-test.apigee.net/altitude?country=XX&postalcode=ZZZZ"
