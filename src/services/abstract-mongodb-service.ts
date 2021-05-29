import { DeleteWriteOpResultObject, ObjectID } from 'mongodb';
import { AbstractMongoDatabase } from '../databases/abstract-mongo';
import { Exception } from '../models/exception';
import { User } from '../user/user';

export abstract class AbstractMongoDbService<T> {
  protected database: AbstractMongoDatabase;
  protected collectionName: string;

  constructor(collectionName: string, database: AbstractMongoDatabase) {
    this.collectionName = collectionName;
    this.database = database;
  }

  async getAll(user: User, page?: number, limit?: number): Promise<T[]> {
    return this.database
      .db()
      .collection<T>(this.collectionName)
      .find()
      .skip(this.skip(page, limit))
      .limit(limit ? limit : 0)
      .toArray()
      .then();
  }

  async get(user: User, id: string): Promise<T> {
    return this.database
      .db()
      .collection(this.collectionName)
      .findOne(new ObjectID(id))
      .then((data: T) => {
        if (!data) {
          throw new Exception(404, 'Not found');
        }
        return data;
      });
  }

  async getBy(
    user: User,
    parameters: any,
    page?: number,
    limit?: number
  ): Promise<T[]> {
    return this.database
      .db()
      .collection(this.collectionName)
      .find(parameters)
      .skip(this.skip(page, limit))
      .limit(limit ? limit : 0)
      .toArray();
  }

  async create(user: User, o: any): Promise<any> {
    return this.database
      .db()
      .collection<T>(this.collectionName)
      .insertOne(o)
      .then((data: any) => {
        return data.ops[0];
      });
  }

  async update(user: User, id: string, body: any): Promise<T> {
    return this.database
      .db()
      .collection(this.collectionName)
      .findOneAndUpdate(
        { _id: new ObjectID(id) },
        {
          $set: body,
          $currentDate: {
            updatedDate: { $type: 'date' }
          }
        },
        { upsert: true, returnOriginal: false }
      )
      .then((data: any) => {
        return data.value;
      });
  }

  async delete(user: User, id: string): Promise<DeleteWriteOpResultObject> {
    return this.database
      .db()
      .collection(this.collectionName)
      .deleteOne({ _id: new ObjectID(id) });
  }

  async count(parameters?: any): Promise<number> {
    const p = parameters ? parameters : {};
    return this.database
      .db()
      .collection(this.collectionName)
      .find(parameters)
      .count();
  }

  private skip(page: number | undefined, limit: number | undefined) {
    return page ? (limit ? (page - 1) * limit : 0) : 0;
  }
}
