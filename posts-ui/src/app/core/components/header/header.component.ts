import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<void>();
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
changeRoute(url:string): void{
  this.router.navigate([url]);
}
}
