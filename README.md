# Apigee Node.js Samples

These are some sample Apigee and Node.js applications for the Node.js support 
in the Apigee API Platform.

To deploy these bundles, install [apigeetool](https://github.com/apigee/api-platform-tools) and follow the directions in each sample's README.

# Node Samples

These samples are unmodified Node.js applications that will run locally or in
the Apigee Platform. The `apigeetool deploynodeapp` script will package these
programs up in a form that may be deployed to Apigee, and deploy them.

# Apigee Samples

While the "Node Samples" are generic Node.js applications that `apigeetool`
turns into Apigee API proxies on deployment, these samples are API proxies that
contain Node.js applications. They do the same thing, but by deploying this
way, we get access to other features of the Apigee API Platform.
