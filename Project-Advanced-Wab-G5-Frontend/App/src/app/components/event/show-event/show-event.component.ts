import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { EventServicesService } from 'src/app/services/event/event-services.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {
  event!:any[]
  status: boolean = false;
  token!:any;

  constructor(private ess : EventServicesService, public local : LocalStorageService, private router : Router) {
    try {
      this.status = this.local.get('status')
      this.onloadevent()
    } catch (error) {
      this.onloadevent()
    }
   }


  ngOnInit(): void {
  }

  onloadevent(){
    try {
      this.ess.getEvent().subscribe(
        data => {
          this.event = data
        },
        err => {
          console.log(err)
        }
      )
    } catch (err) {
      
    }
  }

  toEdit(id:any){
    try {
      id = '/event/' + id
      console.log(id)
      this.router.navigate([id])
      
    } catch (error) {
      this.router.navigate(['/signin'])
    }
  }

  deleteEvent(item:any){
    try {
      console.log(item)
      this.token = this.local.get('user').token
      this.ess.deleteEvent(item, this.token).subscribe(
        data => {
          this.event = data
          this.onloadevent()
        },
        err => {
          console.log(err)
          this.local.clear()
          this.router.navigate(['/signin'])
        }
      )
      
    } catch (error) {
      
    }
  }


}
