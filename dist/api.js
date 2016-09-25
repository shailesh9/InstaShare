"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require("./endpoints/index");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE_ENV = process.env.NODE_ENV;
var nodeEnv = NODE_ENV || "local";
var config = Object.freeze(require("../config/" + nodeEnv));
var app = (0, _express2.default)();

app.set("port", config.http.port);
app.use(_express2.default.static(_path2.default.resolve('public')));
app.use(_bodyParser2.default.json());
app.use(_index.router);

// Starts the app
app.listen(app.get("port"), function () {
  console.log("Server has started and is listening on port: " + app.get("port"));
});
//# sourceMappingURL=api.js.map
