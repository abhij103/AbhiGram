import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { NewpostModalComponent } from 'src/app/shared/components/newpost-modal/newpost-modal.component';
import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';
import { UserDetailsComponent } from './user-details/user-details.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit,OnDestroy {
link = 'user';
  constructor(private matDialog: MatDialog,private userService:UserService) { }

  ngOnInit(): void {

  }
  //CC dynamically calls when the router-oultlet loads a component.
  componentAdded(data){
     if(data instanceof UserDetailsComponent){//CC Getting class name through object
      this.link = 'user';
    }else{
      this.link = 'posts';
    }
  }
  openDialog():void{
    const dialogConfig = new MatDialogConfig();
  //  dialogConfig.height = '70vh';
    dialogConfig.width = '600px';
    this.matDialog.open(NewpostModalComponent, dialogConfig);
  }
ngOnDestroy(): void {
 
}
download(){
  saveAs(environment.baseurl+'docs/userguide.pdf','UserGuide.pdf');
}
}
