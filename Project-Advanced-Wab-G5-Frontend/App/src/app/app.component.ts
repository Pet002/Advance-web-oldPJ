import { Component, DoCheck } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  constructor(public local:LocalStorageService){}
  ngDoCheck(){
    try {
      this.local.get('status')
    } catch (error) {
      this.local.clear()
    }
  }
  title = 'App';
}
