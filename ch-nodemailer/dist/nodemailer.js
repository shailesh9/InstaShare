"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nodemailer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require("nodemailer-smtp-transport");

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents the Nodemailer which is capable of sending mail using custom SMTP server
 * @public
 * @class
 */

var Nodemailer = exports.Nodemailer = function () {

  /**
   * @constructor
   * @param {object} smtpConfig - smtp server configuration
   */
  function Nodemailer(smtpConfig) {
    _classCallCheck(this, Nodemailer);

    if (!smtpConfig || !smtpConfig.host || !smtpConfig.port || !smtpConfig.auth) {
      throw new Error("SMTP config missing");
    }
    this.config = smtpConfig;
    this.transporter = null;
  }

  /**
   * It creates the smtp transporter
   * @private
   * @returns {undefined} Void.
   */


  _createClass(Nodemailer, [{
    key: "_createTransport",
    value: function _createTransport() {
      this.transporter = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)(this.config));
    }

    /**
     * It sends mail to recipient using smtp transporter
     * @param {object} mailOpions - mail options for sending the Email.
     * @public
     * @returns {Q.Promise<void>} Promise whether or not the mail send is OK.
     */

  }, {
    key: "send",
    value: function send(mailOpions) {

      if (!mailOpions || !mailOpions.to || !mailOpions.from) {
        throw new Error("mail options not supplied properly");
      }

      if (!this.transporter) {
        this._createTransport();
      }

      return _q2.default.ninvoke(this.transporter, "sendMail", mailOpions);
    }
  }]);

  return Nodemailer;
}();
//# sourceMappingURL=nodemailer.js.map
