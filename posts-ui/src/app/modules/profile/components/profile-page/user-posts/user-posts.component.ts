import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
imgUrl = environment.baseurl + 'images/ddb986df-05f1-4a7c-b81c-af30d32c442d';
arr = new Array(10);
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
  
  }

}
