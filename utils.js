"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
function startMongoConfig(MONGO_USER, MONGO_PASSWORD) {
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-g5hyn.gcp.mongodb.net/test?retryWrites=true&w=majority`;
    return new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}
exports.startMongoConfig = startMongoConfig;
//# sourceMappingURL=utils.js.map