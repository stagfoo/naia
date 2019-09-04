import { createLogger } from '../logger';
const PACKAGE = require("../package.json");
const path = require('path');

export function serverPing(req, res) {
  const logger = createLogger("ping/now");
  logger("status: ok");
  res.json({
    version: PACKAGE.version,
    status: "ok"
  });
}

export function databasePing(client: any) {
  return function (req, res) {
  const log = createLogger("/ping/atlas");
    client.connect(async (err) => {
      if(err) {
        log(err);
        res.json({
            status: "err"
        });
      } else {
      log("Mongo connection Successful")
      log("status: ok")
      res.json({
          status: "ok"
      });
      }

    });
  }
};

export function imgurPing(imgur: any) {
  return function (req, res) {
    const log = createLogger("ping/imgur");
    const pingImage = `iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVQ4je2TsQ3CMBBFnxMa08WR2IQKJskIUNwMZAcYwWIQMs65JCUpEEIYW4pJy6v+6e6+/hVnnGsAzsCBMi7AsbbW/rIMsAU2xrnmkeruuzW7zgIw+JGbv6fGQpWzfy3HOsJlDQY/AlCv3jpF9oS5ZBOICKoB1YCIlCdQDR9127qyBHP5Gyw3CBXPr/qi709JHXE1S995AsqoJu8x78GsAAAAAElFTkSuQmCC`;
    log(`uploading... ${pingImage}`);
    imgur.uploadBase64(pingImage)
    .then(function (json) {
        log(json.data);
        log("status: ok")
        res.json({
            status: "ok",
            ...json.data
        });
    })
    .catch(function (err) {
        log(err);
    });
  }
}
