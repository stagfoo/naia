"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const PACKAGE = require("../package.json");
const path = require('path');
function serverPing(req, res) {
    const logger = logger_1.createLogger("ping/now");
    logger("status: ok");
    res.json({
        version: PACKAGE.version,
        status: "ok"
    });
}
exports.serverPing = serverPing;
function databasePing(client) {
    return function (req, res) {
        const log = logger_1.createLogger("/ping/atlas");
        client.connect((err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                log(err);
                res.json({
                    status: "err"
                });
            }
            else {
                log("Mongo connection Successful");
                log("status: ok");
                res.json({
                    status: "ok"
                });
            }
        }));
    };
}
exports.databasePing = databasePing;
;
function imgurPing(imgur) {
    return function (req, res) {
        const log = logger_1.createLogger("ping/imgur");
        const pingImage = `iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmUlEQVQ4je2TsQ3CMBBFnxMa08WR2IQKJskIUNwMZAcYwWIQMs65JCUpEEIYW4pJy6v+6e6+/hVnnGsAzsCBMi7AsbbW/rIMsAU2xrnmkeruuzW7zgIw+JGbv6fGQpWzfy3HOsJlDQY/AlCv3jpF9oS5ZBOICKoB1YCIlCdQDR9127qyBHP5Gyw3CBXPr/qi709JHXE1S995AsqoJu8x78GsAAAAAElFTkSuQmCC`;
        log(`uploading... ${pingImage}`);
        imgur.uploadBase64(pingImage)
            .then(function (json) {
            log(json.data);
            log("status: ok");
            res.json(Object.assign({ status: "ok" }, json.data));
        })
            .catch(function (err) {
            log(err);
        });
    };
}
exports.imgurPing = imgurPing;
//# sourceMappingURL=pings.js.map