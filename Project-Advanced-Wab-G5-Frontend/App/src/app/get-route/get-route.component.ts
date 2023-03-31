import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { EventServicesService } from '../services/event/event-services.service';


@Component({
  selector: 'app-get-route',
  templateUrl: './get-route.component.html',
  styleUrls: ['./get-route.component.css']
})
export class GetRouteComponent implements OnInit {
  id!: any;
  theEvent!: any;
  token: any;
  previewLoaded : boolean = true;
  showlink : boolean = false;
  datainbody!: string ;
  data!:any;

  check:boolean = true;

  



  constructor(private routes : ActivatedRoute , private ess : EventServicesService , public local : LocalStorageService, private router : Router) { 
    this.id = this.routes.snapshot.paramMap.get('id');
    try {
      this.token = this.local.get('user').token
      console.log(this.id)
      this.ess.getOneEvent(this.id, this.token).subscribe(
        data => {
          this.theEvent = data
          this.EventForm.patchValue({
            file : this.theEvent.file,
            img : this.theEvent.img
          })
        }
      )
      
    } catch (error) {
      this.router.navigate(['/signin'])
    }
    
    

  }
  
  EventForm = new FormGroup({
    title : new FormControl('' , [Validators.required]),
    body : new FormControl('' , [Validators.required]),
    file : new FormControl('' , [Validators.required]),
    img : new FormControl('', [Validators.required]),
    urllink : new FormControl('' , [ Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
  })

  
  ngDoCheck(){

    if(this.EventForm.status === "VALID"){
      this.showlink = true;
    }else{
      this.showlink = false;
    }

  }

  ngOnInit(): void {
    
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

  editEvent(){
    
    if(this.EventForm.value.body.length > 400){
      this.datainbody = this.EventForm.value.body
      this.datainbody = this.datainbody.substring(0,400)
      this.datainbody = this.datainbody + " อ่านต่อ......"
      this.EventForm.patchValue({
        body : this.datainbody
      })
    }
    if(this.EventForm.status === "VALID"){
      this.ess.updateEvent(this.id, this.EventForm.value, this.token).subscribe(
        data => {
          alert('Successfully\n' + data);
          this.EventForm.reset();
          this.router.navigate(['home'])
        },
        err => {
          alert('File is too large Please Change or resize');
        }
      )
    }else{
      alert('Please Insert Data');
    }
  }


  resetForm(){
    this.theEvent.reset();
    this.previewLoaded = false;
  }


}
