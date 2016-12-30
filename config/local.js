"use strict";

// eslint disable no-var

var environmentVariables = require("./environmentVariables"),
  config = {
    "rabbitMQ": {
      "url": environmentVariables.SMPP_CLIENT_RABBITMQ_URL,
      "queueName": environmentVariables.SMPP_CLIENT_QUEUE_NAME,
      "exchangeType": "direct",
      "prefetchCount": environmentVariables.SMPP_CLIENT_PREFETCH_COUNT,
      "options": {}
    },
    "http": {
      "protocol": "http",
      "port": 8050
    },
    "smtp": {
      "host": 'smtp.gmail.com',
      "port": 465,
      "secure": true, // use SSL
      "auth": {
        "user": "email",
        "pass": 'pass'
      }
    },
    "mongoDb": {
      "connectionString": environmentVariables.SMPP_CLIENT_MONGO_CONNECTION_STRING,
      "operationTimeout": 4000,
      "connectionOptions": {
        "server": {
          "poolSize": 5,
          "socketOptions": {
            "autoReconnect": true,
            "keepAlive": 0
          },
          "reconnectTries": 30,
          "reconnectInterval": 1000
        }
      },
      "promiseTimeout": 4500
    },
    "authorization": {
      "authorize": false
    },
    "environmentVariableChecker": {
      "isEnabled": false
    }
  };

module.exports = config;

// eslint enable no-var
