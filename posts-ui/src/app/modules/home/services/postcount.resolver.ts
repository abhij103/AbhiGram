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
export class PostCountResolver implements Resolve<any> {
  constructor(private hs:HomeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.hs.getPostCount();
  }
}
