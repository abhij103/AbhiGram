import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedDataserviceService } from '../../service/shared-dataservice.service';

@Component({
  selector: 'app-newpost-modal',
  templateUrl: './newpost-modal.component.html',
  styleUrls: ['./newpost-modal.component.scss']
})
export class NewpostModalComponent implements OnInit {
  titleInput:FormControl;
  fileInput:FormControl;
  imageUrl;
  constructor(public dialogRef: MatDialogRef<NewpostModalComponent>,private sds:SharedDataserviceService) { }

  ngOnInit(): void {
    //CC Important Here we can see that we can use a single form control also, very useful.Just doing for learning 
    // anyday form is better.
   this.titleInput = new FormControl('',{validators:[Validators.required,Validators.minLength(5),
    Validators.pattern(/^[a-zA-Z0-9_\.\- ]*$/)]});
  this.fileInput = new FormControl(null,[Validators.required]);
  }
close(){
  this.dialogRef.close();
}
uploadFile(e:Event):void{
  //CC Type casting to HtmlInputElement
  const file = (e.target as HTMLInputElement).files[0];
  this.fileInput.setValue(file);
  let reader = new FileReader();
  reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
  };
  reader.readAsDataURL(file);
 }
 post(){
  if(!this.titleInput.errors && !this.fileInput.errors){
    this.sds.createPostDb({title:this.titleInput.value,myphoto:this.fileInput.value}).subscribe(res=>{
      this.sds.updatePost.next(res.post);
      this.close();
    });
  }
 }
}
