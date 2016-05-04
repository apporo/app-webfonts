'use strict';

var events = require('events');
var util = require('util');
var path = require('path');

var Devebot = require('devebot');
var lodash = Devebot.require('lodash');
var debug = Devebot.require('debug');
var debuglog = debug('webfonts:service');

var Service = function(params) {
  debuglog(' + constructor begin ...');
  
  Service.super_.apply(this);

  params = params || {};

  var self = this;
  
  self.getSandboxName = function() {
    return params.sandboxName;
  };
  
  self.logger = params.loggingFactory.getLogger();
  
  var cfgWebfonts = lodash.get(params, ['sandboxConfig', 'plugins', 'appWebfonts'], {});
  var contextPath = cfgWebfonts.contextPath || '/webfonts';

  debuglog(' - attach plugin app-webfonts into app-webserver');

  var webserverTrigger = params.webserverTrigger;
  var express = webserverTrigger.getExpress();
  var position = webserverTrigger.getPosition();

  webserverTrigger.inject(express.static(path.join(__dirname, '../../public/assets')),
      contextPath + '/assets', position.inRangeOfStaticFiles(), 'webfonts-assets');

  self.getServiceInfo = function() {
    return {};
  };

  self.getServiceHelp = function() {
    return {};
  };
  
  debuglog(' - constructor end!');
};

Service.argumentSchema = {
  "id": "webfontsService",
  "type": "object",
  "properties": {
    "sandboxName": {
      "type": "string"
    },
    "sandboxConfig": {
      "type": "object"
    },
    "profileConfig": {
      "type": "object"
    },
    "generalConfig": {
      "type": "object"
    },
    "loggingFactory": {
      "type": "object"
    },
    "webserverTrigger": {
      "type": "object"
    }
  }
};

util.inherits(Service, events.EventEmitter);

module.exports = Service;
