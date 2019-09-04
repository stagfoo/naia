"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = require("./logger");
const imgur_1 = __importDefault(require("imgur"));
const utils_1 = require("./utils");
const pings_1 = require("./routes/pings");
const cors_1 = __importDefault(require("cors"));
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});
const mongoclient = utils_1.startMongoConfig(process.env.MONGO_USER, process.env.MONGO_PASSWORD);
imgur_1.default.setCredentials(process.env.IMGUR_ACCOUNT, process.env.IMGUR_PASSWORD, process.env.IMGUR_CLIENT_ID);
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get("/ping/now", pings_1.serverPing);
app.get("/ping/atlas", pings_1.databasePing(mongoclient));
app.get("/ping/imgur", pings_1.imgurPing(imgur_1.default));
app.get("/ping/auth0", checkJwt, (req, res) => {
    res.json({
        status: "ok"
    });
});
app.get("/login", (req, res) => {
    res.render('login', Object.assign({}, process.env));
});
app.listen(3000, () => {
    const logger = logger_1.createLogger("Listen");
    logger(3000);
});
module.exports = app;
//# sourceMappingURL=index.js.map