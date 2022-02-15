import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input() post;
imgLoad = false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  loadFun(){
    this.imgLoad = true;
  }
  downloadImage(){
    //CC Alternative way used just 2 learn. saveAs is shortcut.
    // this.http.get(this.post.imageUrl, { responseType: 'blob' }).subscribe(val => {
    //   const url = URL.createObjectURL(val);
    //   this.downloadUrl(url, `${this.post.title}.jpg`);
    //   URL.revokeObjectURL(url);
    // });
  saveAs(this.post.imageUrl, `${this.post.title}.jpg`);
  }
   downloadUrl(url: string, fileName: string):void {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };


}
