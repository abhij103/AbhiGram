import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy{
  @Output() toggleNav = new EventEmitter<void>();
  currentUrl;
  notifier = new Subject();
  isAuthenticated = false;
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.pipe(takeUntil(this.notifier)).subscribe(user=>{
      this.isAuthenticated=!!user;
  });
    //CC Vimp Getting every route change 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event:any)=>{
       this.currentUrl = event.url;
    });
    
  }
changeRoute(url:string): void{
  this.router.navigate([url]);
}
logout(){
  this.authService.logout();
}
ngOnDestroy(): void {
  this.notifier.next(null);
  this.notifier.complete();
}
}
