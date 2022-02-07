import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { UserDetailsComponent } from './components/profile-page/user-details/user-details.component';
import { UserPostsComponent } from './components/profile-page/user-posts/user-posts.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProfilePageComponent,
    UserDetailsComponent,
    UserPostsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class ProfileModule { }
