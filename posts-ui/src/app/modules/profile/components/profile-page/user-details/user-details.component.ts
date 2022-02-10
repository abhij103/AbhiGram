import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserInfo } from '../../../models/userinfo.model';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit,OnDestroy {
  user:UserInfo;
  displayedColumns: string[] = ['position', 'field', 'value'];
  dataSource = [];
  notifier = new Subject<void>();
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.userInfo.pipe(takeUntil(this.notifier)).subscribe((userInfo:UserInfo)=>{
     this.user = {...userInfo};//CC Spread operator usedsince we are directly subscribing to subject value
     // we don't want to change it by mistake also.
     Object.keys(this.user).forEach((item,index)=>{
       this.dataSource.push({position:index+1,field:item,value:this.user[item]});
     });
    })
  
  }
  ngOnDestroy(): void {
      this.notifier.next();
      this.notifier.complete();
  }
}
