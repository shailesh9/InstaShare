"use strict";

var _chai = require("chai");

var _sinon = require("sinon");

var _nodemailer = require("../../dist/nodemailer");

var validConfig = {
  "host": "abc.com",
  "port": 111,
  "secure": true,
  "auth": {
    "user": "testUser",
    "pass": "testPwd"
  }
},
    invalidConfig = {
  "foo": "bar"
},
    validMailOption = {
  "to": "sender",
  "from": "recipient"
},
    invalidMailOption = {
  "foo": "bar"
};

describe("Nodemailer Tests ===> ", function () {

  describe("The Nodemailer Instance", function () {

    describe("when it's been created with valid config", function () {

      var nodemailer = void 0;

      before(function () {
        nodemailer = new _nodemailer.Nodemailer(validConfig);
      });

      after(function () {
        nodemailer = null;
      });

      it("should have a member referencing to config", function () {
        (0, _chai.expect)(nodemailer).to.have.property("config");
      });

      it("should have a member referencing to transporter", function () {
        (0, _chai.expect)(nodemailer).to.have.property("transporter");
      });

      it("should have a method referencing to _createTransport()", function () {
        (0, _chai.expect)(nodemailer).to.have.property("_createTransport");
      });

      it("should have a method referencing to send()", function () {
        (0, _chai.expect)(nodemailer).to.have.property("send");
      });
    });

    describe("when it's been created with invalid config", function () {

      it("should throw an error", function () {

        function createNodemailer() {
          return new _nodemailer.Nodemailer(invalidConfig);
        }

        (0, _chai.expect)(createNodemailer).to.throw(Error);
      });
    });
  });

  describe("when send() method is called", function () {

    describe("when called with valid arguments", function () {

      var nodemailer = void 0;

      before(function () {
        nodemailer = new _nodemailer.Nodemailer(validConfig);
        nodemailer.transporter = {
          "sendMail": (0, _sinon.spy)()
        };
      });

      after(function () {
        nodemailer = null;
      });

      it("should call sendMail() method successfully", function () {
        nodemailer.send(validMailOption).then(function () {
          (0, _chai.expect)(nodemailer.transporter.sendMail.called).to.be.true;
        });
      });
    });

    describe("when called with invalid arguments", function () {

      var nodemailer = void 0;

      before(function () {
        nodemailer = new _nodemailer.Nodemailer(validConfig);
      });

      after(function () {
        nodemailer = null;
      });

      it("should throw an error", function () {
        (0, _chai.expect)(function () {
          nodemailer.send(invalidMailOption);
        }).to.throw(Error);
      });
    });
  });
});
//# sourceMappingURL=nodemailer.spec.js.map
