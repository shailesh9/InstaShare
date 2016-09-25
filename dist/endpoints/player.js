"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formidable = require("formidable");

var _formidable2 = _interopRequireDefault(_formidable);

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
  function Player(nodeMailer) {
    _classCallCheck(this, Player);

    this.nodeMailer = nodeMailer;
  }

  _createClass(Player, [{
    key: "getPlayer",
    value: function getPlayer(req, res) {
      var _this = this;

      console.log("GOt post request");
      this.mailOption = {
        // "from": "dav.warne9@gmail.com",
        "attachments": []
      };
      var form = new _formidable2.default.IncomingForm();

      // specify that we want to allow the user to upload multiple files in a single request
      form.multiples = true;

      // store all uploads in the /uploads directory
      form.uploadDir = _path2.default.resolve('uploads');

      form.on('field', function (name, value) {
        switch (name) {
          case "friendEmail":
            {
              _this.mailOption.to = value;
            }
            break;
          case "userEmail":
            {
              _this.mailOption.from = value;
            }
            break;
          case "message":
            {
              _this.mailOption.text = value;
            }
        }
      });

      form.on('file', function (name, file) {
        _fs2.default.rename(file.path, _path2.default.join(form.uploadDir, file.name));
        var fileDetail = {
          "filename": name,
          "path": "uploads/" + name
        };
        _this.mailOption.attachments.push(fileDetail);
      });

      form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
      });

      // once all the files have been uploaded, send a response to the client
      form.on('end', function () {
        console.log("File uploaded Successfully");
        _this.nodeMailer.send(_this.mailOption).then(function (resp) {
          console.log("Mail send Successfully =>>>>>>>>", resp);
          res.statusCode = 200;
          res.send(resp);
        }, function (err) {
          console.log("Mail not sent =>>>>>>>", err);
          res.statusCode = 500;
          res.send(err);
        });
      });

      // parse the incoming request containing the form data
      form.parse(req);
    }
  }]);

  return Player;
}();
//# sourceMappingURL=player.js.map
