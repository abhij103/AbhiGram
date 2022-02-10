import { getDb } from "../utils/database";
import {ObjectId} from 'mongodb';
class Post{
    constructor(private title:string,
        private imageUrl:string, private creator:ObjectId , private createdAt:string , private updatedAt:string) {}
    

   addPost(): Promise<any>  {
    const db = getDb();
    return db
      .collection('posts')
      .insertOne(this)
   }
   static getAllPostsDb(pageNo:number){
    const db = getDb();
    return db.collection('posts').find().skip((pageNo-1)*6).limit(6).toArray()
   }
   static getTotalPostsCount(){
    const db = getDb();
    return db.collection('posts').find().toArray();
   }
//    updatePost(pid){
//       const db = getDb();
//       return db.collection('posts')
//       .updateOne({ _id: pid }, { $set: this });
//    }
//   static getAllPosts(pageNo){
//    const db = getDb();
// return db.collection('posts').find().skip((pageNo-1)*2).limit(2).toArray()
//      .then(products => {
//        return products;
//      })
//      .catch(err => {
//   })
// }
static findUserPosts(uid:any):Promise<any>{
   const db = getDb();
   return db
     .collection('posts')
     .find({ creator: uid }).toArray()
}
// static findPostById(pid){
//    const db = getDb();
//    return db
//      .collection('posts')
//      .findOne({ _id: pid })
//      .then(post => {
//        return post;
//      })
//      .catch(err => {
//        console.log(err);
//      });
// }
}
export default Post;