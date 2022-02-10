import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedDataserviceService } from 'src/app/shared/service/shared-dataservice.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
imgUrl = environment.baseurl + 'images/c559734c-b2a1-4724-bea1-52104eeb1f73';
arr = [];
spinner = true;
  constructor(private userService:UserService,private sds:SharedDataserviceService) { }

  ngOnInit(): void {
     this.userService.getUserPosts().subscribe({
       next:res=>{ this.arr = res;
       this.spinner = false;
      },
       error: err=>{this.spinner = false;}
     })
    this.sds.updatePost.subscribe(post=>{
      this.arr.unshift({...post,imageUrl:environment.baseurl+post.imageUrl});//CC add to beginning of array;
    })
  }
  trackByMethod(index:number, el:any): string {
    return el._id;
  }

}
