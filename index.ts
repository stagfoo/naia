require('dotenv').config();
import Express from 'express';
import BodyParser from 'body-parser';
import { createLogger } from './logger';
import imgur from 'imgur';
import { startMongoConfig } from './utils';
import { serverPing, databasePing, imgurPing } from './routes/pings';
import cors from 'cors';

// Set Protected Route checking function
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
// Set Database client
const mongoclient = startMongoConfig(process.env.MONGO_USER, process.env.MONGO_PASSWORD);
// Set Image Upload endpoint
imgur.setCredentials(process.env.IMGUR_ACCOUNT, process.env.IMGUR_PASSWORD, process.env.IMGUR_CLIENT_ID);


// Setup Express
const app = Express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')



// Pings
app.get("/ping/now", serverPing);
app.get("/ping/atlas", databasePing(mongoclient));
app.get("/ping/imgur",imgurPing(imgur));
app.get("/ping/auth0", checkJwt, (req, res) => {
    res.json({
      status: "ok"
  });
});
app.get("/login", (req, res) => {
  res.render('login', {
    ...process.env
  })
});


app.listen(3000, () => {
  const logger = createLogger("Listen");
  logger(3000);
});

module.exports = app;
