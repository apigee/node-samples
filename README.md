* "Mashup"

A mashup of the Google geocoding and altitude APIs. It gives you the
average altitude of any postal code in the world.

To use:
    curl "http://whatever:whatever/altitude?country=XX&postalcode=ZZZZ"
    
To deploy:

    apigeetool deploynodeapp -u USERNAME -p PASSWORD \
      -l https://api.jupiter.apigee.net \
      -o ORG -e test -n altitude -d node/mashup
      -m mashup.js -b /altitude

* "Employees demo"

A simple API built using Express and Usergrid that maintains a 
database of "employee" names and phone numbers.

    apigeetool deploynodeapp -u USERNAME -p PASSWORD \
      -l https://api.jupiter.apigee.net \
      -o ORG -e test -n employees -d node/employees
      -m server.js -b /employees
  

