import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ShowEventComponent } from './components/event/show-event/show-event.component';
import { InputEventComponent } from './components/event/input-event/input-event.component';
import { GetRouteComponent } from './get-route/get-route.component';
import { MemberComponent } from './components/member/member.component';
import { SigninComponent } from './components/signin/signin.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ExampleOfEventComponent } from './components/event/example-of-event/example-of-event.component';


import { AngularWebStorageModule } from 'angular-web-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateComponent } from './components/update/update.component';
import { AddmemberComponent } from './components/addmember/addmember.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowEventComponent,
    InputEventComponent,
    GetRouteComponent,
    MemberComponent,
    SigninComponent,
    NavigationBarComponent,
    ExampleOfEventComponent,
    UpdateComponent,
    AddmemberComponent,
    AddAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularWebStorageModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
