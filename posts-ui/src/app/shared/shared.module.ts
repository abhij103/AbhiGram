import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewpostModalComponent } from './components/newpost-modal/newpost-modal.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostCardComponent } from './components/post-card/post-card.component';



@NgModule({
  declarations: [
    NewpostModalComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports:[
    NewpostModalComponent,
    PostCardComponent
  ]
})
export class SharedModule { }
