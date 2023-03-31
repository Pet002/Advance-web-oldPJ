import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, DoCheck {

  status: boolean = false;

  constructor(public local : LocalStorageService , private router : Router) { 
    
    
  }
  ngDoCheck(){
    this.status = this.local.get('status')
    
  }

  ngOnInit(): void {
  }

  signout() {
    this.local.clear();
    this.router.navigate(['/signin']);
  }

}
