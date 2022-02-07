import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { UserDetailsComponent } from './components/profile-page/user-details/user-details.component';
import { UserPostsComponent } from './components/profile-page/user-posts/user-posts.component';

const routes: Routes = [
  {path:'',component:ProfilePageComponent,children:[
    {path:':tab/details',component:UserDetailsComponent},
    {path:':tab/user',component:UserPostsComponent}
  ]}
 // {path:'',component:ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
