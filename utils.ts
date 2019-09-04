import { MongoClient } from 'mongodb';

export function startMongoConfig(MONGO_USER: string, MONGO_PASSWORD: string){
  const uri =
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-g5hyn.gcp.mongodb.net/test?retryWrites=true&w=majority`;
  return new MongoClient(uri, ({ useNewUrlParser: true, useUnifiedTopology: true } as any));
}
