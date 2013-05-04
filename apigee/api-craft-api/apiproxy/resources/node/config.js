function Config() {
  this.port = process.env.PORT || 3001;
  this.baseHrefUri = process.env.BASE_HREF_URI || 'http://localhost:' + this.port;
  this.baseRelUri = process.env.BASE_REL_URI || 'http://rels.api-craft.org';
  this.location = process.env.CONF_LOCATION || 'detroit2013';
  this.dbUri = process.env.DATABASE_URL || 'http://localhost:5984/api-craft-conf-' + this.location;
  this.eventbriteAppKey = process.env.EVENTBRITE_APP_KEY;
  this.eventbriteUserKey = process.env.EVENTBRITE_USER_KEY;
  this.eventbriteEventId = process.env.EVENTBRITE_EVENT_ID;
}

module.exports = new Config();
