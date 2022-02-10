import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
postCount;
posts = [];
currentPageIndex=0;
myControl = new FormControl();
options: string[] = [];
filteredOptions: Observable<string[]>;
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
       this.postCount = data['0'].count;
       this.posts = data['1'];
       this.makeOptions(this.posts);
    })
    this.route.params.subscribe(
      (params: Params) => {
        this.currentPageIndex= (+params['pid']) -1;
      }
    );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  private makeOptions(posts): void{
     for(const post of posts){
       this.options.push(post.title);
     }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
onPaginate(pageEvent:PageEvent){
  this.currentPageIndex = pageEvent.pageIndex;
  this.router.navigate(['home/posts',pageEvent.pageIndex+1])
}
}
