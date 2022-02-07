import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewpostModalComponent } from './components/newpost-modal/newpost-modal.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NewpostModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    NewpostModalComponent
  ]
})
export class SharedModule { }
