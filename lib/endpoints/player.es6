"use strict";
import formidable from "formidable";
import path from "path";
import fs from "fs";

export class Player {

  constructor(nodeMailer) {
    this.nodeMailer = nodeMailer;
  }

  getPlayer(req, res) {
    console.log("GOt post request");
    this.mailOption = {
      "subject": "",
      "attachments": []
    };
    let form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.resolve('uploads');

    form.on('field', (name, value) => {
      switch (name) {
        case "friendEmail": {
          this.mailOption.to = value
        }
        break;
        case "userEmail": {
          this.mailOption.from = value;
          this.mailOption.subject = value + " has sent you a file via InstaShare";
        }
        break;
        case "message": {
          this.mailOption.text = value;
        }
      }
    });

    form.on('file', (name, file) => {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
      let fileDetail = {
        "filename": name,
        "path": "uploads/"+name
      };
      this.mailOption.attachments.push(fileDetail)
    });

    form.on('error', err => {
      console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', () => {
      console.log("File uploaded Successfully");
      this.nodeMailer.send(this.mailOption)
        .then(resp => {
          console.log("Mail send Successfully =>>>>>>>>", resp)
          res.statusCode = 200;
          res.send(resp)
        }, err => {
          console.log("Mail not sent =>>>>>>>", err);
          res.statusCode = 500;
          res.send(err);
        });
    });

    // parse the incoming request containing the form data
    form.parse(req);

  }
}