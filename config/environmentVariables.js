"use strict";

// eslint disable no-var

var environmentVariables = {
  "SMPP_CLIENT_MONGO_CONNECTION_STRING": process.env.SMPP_MONGO_CONNECTION_STRING || "mongodb://localhost:27017/SMPP",
  "SMPP_CLIENT_RABBITMQ_URL": process.env.SMPP_RABBITMQ_URL || "amqp://mqadmin:mqadmin@localhost:5672",
  "SMPP_CLIENT_QUEUE_NAME": process.env.SMPP_QUEUE_NAME || "sms_queue_routing",
  "SMPP_CLIENT_PREFETCH_COUNT": process.env.SMPP_PREFETCH_COUNT || 1
};

module.exports = environmentVariables;

// eslint enable no-var
