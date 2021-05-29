import { Db, MongoClient } from 'mongodb';
import { JsonSchemaMongo } from '../validators/json-schema-mongo';

export abstract class AbstractMongoDatabase {
  private _client: MongoClient;
  private _db: Db;

  constructor(uri: string) {
    this._client = new MongoClient(uri, { useUnifiedTopology: true });
    this._db = this._client.db();
  }

  db(): Db {
    return this._db;
  }

  connect(uri: string): void {
    this._client
      .connect()
      .then((connection) => {
        console.log('Database connection established');
        this._db = connection.db();
      })
      .catch((err) => console.error(err));
  }

  createCollection(schema: JsonSchemaMongo[]): void {
    this._db
      ?.listCollections()
      .toArray()
      .then((collections) => {
        if (collections.length === 0) {
          schema.forEach((v) => {
            this._db
              ?.createCollection(v.name, { validator: v.jsonSchema })
              .then((collection) => {
                v.uniques.forEach((u) => {
                  collection.createIndex({ [u]: 1 }, { unique: true });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
  }

  fillCollection(): void {}
}
