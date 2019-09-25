import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { InputComponent } from './component/input/input.component';
import { InquireComponent } from './component/inquire/inquire.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'input',
    component: InputComponent
  },
  {
    path: 'inquire',
    component: InquireComponent
  },
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  } 
  ,
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
