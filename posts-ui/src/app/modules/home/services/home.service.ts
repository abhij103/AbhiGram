import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({ providedIn: 'root' })
export class HomeService{
    constructor(private http:HttpClient){}
//userInfo = new BehaviorSubject<UserInfo>(null);
//CC BehaviorSubject stores the last pushed value only
// setUser(user:UserInfo){
//     this.userInfo.next(user);
// }
getPostCount():Observable<any>{
   return this.http.get<any>(environment.baseurl+'post/count')
}
getPagePosts(pageNo):Observable<any>{
    
    const params = new HttpParams().set('page',pageNo)
    return this.http.get<any>(environment.baseurl+'post/all',{params}).pipe(map(res=>{
        return  res.post.map(p=>{
            return {...p,imageUrl:environment.baseurl+p.imageUrl};
        })
      })); 
 }
}
