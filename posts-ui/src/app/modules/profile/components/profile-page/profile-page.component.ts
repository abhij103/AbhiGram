import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewpostModalComponent } from 'src/app/shared/components/newpost-modal/newpost-modal.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
link:string = 'user';
  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {

  }
  openDialog():void{
    const dialogConfig = new MatDialogConfig();
  //  dialogConfig.height = '70vh';
    dialogConfig.width = '600px';
    this.matDialog.open(NewpostModalComponent, dialogConfig);
  }
componentAdded(data:any):void{
  this.link = data.route.params._value.tab;
  // Important we are getting tab param value whenever component is added
  // in router outlet, this event is triggered.
}
}
