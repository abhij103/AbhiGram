import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { UserInfo } from "../models/userinfo.model";
@Injectable({ providedIn: 'root' })
export class UserService{
    constructor(private http:HttpClient){}
userInfo = new BehaviorSubject<UserInfo>(null);
//CC BehaviorSubject stores the last pushed value only
setUser(user:UserInfo){
    this.userInfo.next(user);
}
getUserInfo():Observable<any>{
   return this.http.get<{userInfo:UserInfo}>(environment.baseurl+'auth/getuser').pipe(tap(res=>{
        this.setUser(res.userInfo);
      }));
}
getUserPosts():Observable<any>{
 return this.http.get<any>(environment.baseurl+'post/userposts').pipe(map(res=>{
   return  res.post.map(p=>{
       return {...p,imageUrl:environment.baseurl+p.imageUrl};
   })
 })); 
}
}