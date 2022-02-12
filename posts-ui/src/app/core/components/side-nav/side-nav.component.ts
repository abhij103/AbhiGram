import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
@Output() closeNav = new EventEmitter<void>();
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
  }
}
