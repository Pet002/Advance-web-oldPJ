import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputEventComponent } from './components/event/input-event/input-event.component';
import { ShowEventComponent } from './components/event/show-event/show-event.component';
import { HomeComponent } from './components/home/home.component';
import { MemberComponent } from './components/member/member.component';

import { SigninComponent } from './components/signin/signin.component';
import { GetRouteComponent } from './get-route/get-route.component';
import { UpdateComponent } from './components/update/update.component';
import { AddmemberComponent } from './components/addmember/addmember.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path : 'home' , component: HomeComponent},
  {path : 'addEvent' , component : InputEventComponent},
  {path : 'event/:id' , component : GetRouteComponent},
  {path : 'signin' , component : SigninComponent},
  {path : 'members' , component : MemberComponent},
  {path: 'edit/:id', component: UpdateComponent },
  {path : 'addMember' , component : AddmemberComponent},
  {path : 'addAdmin' , component : AddAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
