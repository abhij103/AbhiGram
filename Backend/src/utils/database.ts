import 'dotenv/config'
import {MongoClient} from 'mongodb';

let _db;

export const mongoConnect = async (): Promise<void> => { 
 const client = await MongoClient.connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zwbuo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
  )
  _db = client.db();
 return;
};