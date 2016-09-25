"use strict";

import express from "express";
import bodyParser from "body-parser";
import {router} from "./endpoints/index";
import path from "path";

let {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  app = express();

app.set("port", config.http.port);
app.use(express.static(path.resolve('public')));
app.use(bodyParser.json());
app.use(router);

// Starts the app
app.listen(process.env.PORT || app.get("port"), function () {
  console.log("Server has started and is listening on port: " + app.get("port"));
});