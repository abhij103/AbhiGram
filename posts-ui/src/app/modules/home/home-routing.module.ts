import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostCountResolver } from './services/postcount.resolver';
import { PostResolver } from './services/posts.resolver';

const routes: Routes = [
  {path:'posts/:pid',component:HomePageComponent,
  resolve:[PostCountResolver,PostResolver]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
