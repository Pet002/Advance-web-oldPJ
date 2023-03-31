import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { EventServicesService } from 'src/app/services/event/event-services.service';

@Component({
  selector: 'app-example-of-event',
  templateUrl: './example-of-event.component.html',
  styleUrls: ['./example-of-event.component.css']
})
export class ExampleOfEventComponent implements OnInit, DoCheck {

  @Input() FormMessage : any ;
  @Input() preview !: boolean;

  showlink: boolean = false;
  datainbody!: string ;
  token :any;

  constructor(private ess : EventServicesService , public local : LocalStorageService, private router : Router) {
    try {
      this.token = this.local.get('user').token
      
    } catch (error) {
      this.router.navigate(['/signin'])
    }
   }

  ngOnInit(): void {
  }

  ngDoCheck(){
    if(this.FormMessage.status === "VALID"){
      this.showlink = true;
    }else{
      this.showlink = false;
    }
  }
  
  addEvent(){
    
    if(this.FormMessage.value.body.length > 400){
      this.datainbody = this.FormMessage.value.body
      this.datainbody = this.datainbody.substring(0,400)
      this.datainbody = this.datainbody + " อ่านต่อ......"
      this.FormMessage.patchValue({
        body : this.datainbody
      })
    }
    if(this.FormMessage.status === "VALID"){
      this.ess.addEvent(this.FormMessage.value, this.token).subscribe(
        data => {
          alert('Successfully');
          this.FormMessage.reset();
        },
        err => {
          alert('File is too large Please Change or resize');
          console.log(err)
        }
      )
    }else{
      alert('Please Insert Data');
    }
  }


  resetForm(){
    this.FormMessage.reset();
    this.preview = false;
  }



}
