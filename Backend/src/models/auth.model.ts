import { getDb } from "../utils/database";
// const ObjectId = mongodb.ObjectId;
class User{
    constructor(private email:string, private password:any, private name:string ,private status:string) {
      }

   addUser():Promise<any>  {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
   }
//    static findUserById(userId){
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: userId })
//       .then(user => {
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//    }
   static async findUserByEmail(searchEmail:string):Promise<any>{
    const db = getDb();
    const user = await db.collection('users').findOne({ email : searchEmail })
    return Promise.resolve(user);
    //   .collection('users')
    //   .findOne({ email : searchEmail })
    //   .then(user => {
    //     return user; //it's also retuned as a promise, but it resolves instantly
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
   }
}
export default User;