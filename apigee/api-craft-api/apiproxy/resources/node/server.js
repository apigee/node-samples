var argo = require('argo');
var config = require('./config');
var middleware = require('./middleware');
var resources = require('./resources');

// HACK TIME

process.env.YELP_CONSUMER_KEY = '5SqpGb9Y-jno81OO-VdJiA';
process.env.YELP_CONSUMER_SECRET = 'J2Xm2uuWMwU_UexGCfg_VC9wznY';
process.env.YELP_TOKEN = 'BPHSv44BV-e2nolQyUs1U1cSjWLxfbca';
process.env.YELP_TOKEN_SECRET = 'QyRys2UNApDANO8ILK85FqwOOgc';
process.env.EVENTBRITE_APP_KEY = 'AVU5JYM7RBLUMSIJYM';
process.env.EVENTBRITE_USER_KEY = '12688666073829756906';
process.env.EVENTBRITE_EVENT_ID = '5671981048';
process.env.CONF_LOCATION = 'detroit2013';

var server = argo()
  .use(middleware.config(config))
  .use(middleware.helpers)
  .use(middleware.database)
  .use(middleware.cors)
  .use(middleware.errors)
  .get('/', resources.home)
  .map('/conferences', resources.conferences);

server.listen(config.port);

console.log('API Craft Conf API listening on ' + config.baseHrefUri);
