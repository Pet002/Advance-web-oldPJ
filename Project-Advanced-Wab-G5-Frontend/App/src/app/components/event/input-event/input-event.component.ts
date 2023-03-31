import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { EventServicesService } from 'src/app/services/event/event-services.service';

@Component({
  selector: 'app-input-event',
  templateUrl: './input-event.component.html',
  styleUrls: ['./input-event.component.css']
})
export class InputEventComponent implements OnInit, DoCheck{
  
  link!:String

  

  EventForm = new FormGroup({
    title : new FormControl('' , [Validators.required]),
    body : new FormControl('' , [Validators.required]),
    file : new FormControl('' , [Validators.required]),
    img : new FormControl('' , [Validators.required]),
    urllink : new FormControl('' , [ Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
  })

  previewLoaded : boolean = false;
  showlink : boolean = false;
  datainbody!: string ;
  token!: any

  constructor(private ess : EventServicesService , public local : LocalStorageService, private router : Router) {
    try {
      this.token = this.local.get('user').token
      
    } catch (error) {
      this.router.navigate(['/signin'])
    }
    
    
   }

  
  ngDoCheck(){
    
    if(this.EventForm.status === "VALID"){
      this.showlink = true;
    }else{
      this.showlink = false;
    }

  }

  ngOnInit(): void {
  }


  addEvent(){
    
    if(this.EventForm.value.body.length > 400){
      this.datainbody = this.EventForm.value.body
      this.datainbody = this.datainbody.substring(0,400)
      this.datainbody = this.datainbody + " อ่านต่อ......"
      this.EventForm.patchValue({
        body : this.datainbody
      })
    }
    if(this.EventForm.status === "VALID"){
      this.ess.addEvent(this.EventForm.value, this.token).subscribe(
        data => {
          alert('Successfully\n' + data);
          this.EventForm.reset();
        },
        err => {
          alert('File is too large Please Change or resize');
        }
      )
    }else{
      alert('Please Insert Data');
    }
  }

  onChangeImage(e:any){
    if(e.target.files.length > 0) {
      const file = e.target.files[0]
      var pattern = /image-*/;
      const reader = new FileReader();
      if(!file.type.match(pattern)){
        alert('ไฟล์ที่นำเข้าไม่ใช่รูปภาพ')
      }else{
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.EventForm.patchValue({
            img : reader.result
          })
        }
      }
    }
  }



  resetForm(){
    this.EventForm.reset();
    this.previewLoaded = false;
  }

}
