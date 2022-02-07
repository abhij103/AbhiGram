import 'dotenv/config'
import {MongoClient} from 'mongodb';

let _db:any;

export const mongoConnect = async (): Promise<void> => { 
 const client = await MongoClient.connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zwbuo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
  )
  _db = client.db();
 return;
};
export const getDb = () => {
    if (_db) {
      return _db;
    }
    throw 'No database found!';
  };