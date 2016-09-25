"use strict";

import express from "express";
import {Player} from "./player";
import {Ghost} from "./ghost";
import NodeMailer from "../../ch-nodemailer"

let router = express.Router(),
  {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../../config/" + nodeEnv)),
  playerRoute = router.route("/player"),
  ghostRoute = router.route("/"),
  nodeMailerInst = new NodeMailer(config.smtp),
  playerInstance = new Player(nodeMailerInst),
  ghostInstance = new Ghost();

playerRoute
  .post(playerInstance.getPlayer.bind(playerInstance));

ghostRoute
  .get(ghostInstance.getGhost.bind(ghostInstance));

export {router};