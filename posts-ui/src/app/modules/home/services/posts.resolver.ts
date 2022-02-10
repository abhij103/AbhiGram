import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HomeService } from './home.service';
@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<any> {
  constructor(private hs:HomeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const pageNo = route.paramMap.get('pid')
    return this.hs.getPagePosts(pageNo);
  }
}
