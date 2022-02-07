import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedDataserviceService {
baseUrl = environment.baseurl;
  constructor(private http:HttpClient) { }
  createPostDb(postData):Observable<any>{
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('myFile', postData.myphoto);
   return this.http.post<any>(this.baseUrl+'post/create',formData)
  }
}
