"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _player = require("./player");

var _ghost = require("./ghost");

var _chNodemailer = require("ch-nodemailer");

var _chNodemailer2 = _interopRequireDefault(_chNodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var NODE_ENV = process.env.NODE_ENV;
var nodeEnv = NODE_ENV || "local";
var config = Object.freeze(require("../../config/" + nodeEnv));
var playerRoute = router.route("/player");
var ghostRoute = router.route("/");
var nodeMailerInst = new _chNodemailer2.default(config.smtp);
var playerInstance = new _player.Player(nodeMailerInst);
var ghostInstance = new _ghost.Ghost();

playerRoute.post(playerInstance.getPlayer.bind(playerInstance));

ghostRoute.get(ghostInstance.getGhost.bind(ghostInstance));

exports.router = router;
//# sourceMappingURL=index.js.map
