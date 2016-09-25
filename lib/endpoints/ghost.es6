"use strict";

export class Ghost {

  constructor() {

  }

  getGhost(req, res) {
    res.sendFile('share.html',{ root: './views' });
  }
}