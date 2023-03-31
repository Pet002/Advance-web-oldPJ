import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MembersService } from 'src/app/services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/Member';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
 
  titleList: string[] = ['นาย', 'นาง', 'นางสาว'];
  majorList: string[] = ['วิศวกรรมขนส่ง', 'วิศวกรรมการผลิต', 'วิศวกรรมไฟฟ้า', 'วิศวกรรมโยธา', 'วิศวกรรมสิ่งแวดล้อม', 'วิศวกรรมโลหะการ', 'วิศวกรรมธรณี', 'วิศวกรรมอิเล็กทรอนิกส์',
    'วิศวกรรมอุตสาหการ', 'วิศวกรรมเครื่องกล', 'วิศวกรรมเกษตร', 'วิศวกรรมคอมพิวเตอร์', 'วิศวกรรมเคมี', 'วิศวกรรมเซรามิก', 'วิศวกรรมโทรคมนาคม', 'วิศวกรรมพอลิเมอร์', 'วิศวกรรมอินเตอร์',];
  
  id:any;
  token:any;
  oneMember:any;

    constructor(private ms: MembersService, private r: Router, private routes : ActivatedRoute, public local : LocalStorageService) {
      this.id = this.routes.snapshot.paramMap.get('id');
      try {
        this.token = this.local.get('user').token
        this.ms.getOneMember(this.id, this.token).subscribe(
          data => {
            console.log(data)
            this.oneMember = data;
            this.memberForm.patchValue({
              file : this.oneMember.file,
              img : this.oneMember.img
            })
          }
        )
      } catch (error) {
        
      }
     }
    private member = Member;
  ngOnInit(): void {
    this.member = this.ms.getter();
  }

  memberForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    sid: new FormControl('', [Validators.required, Validators.pattern('B[0-9]{7}')]),
    major: new FormControl('', [Validators.required]),
    facebook: new FormControl('', [Validators.required]),
    tell: new FormControl('', [Validators.required, Validators.pattern('0[0-9]{9}')]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  })
  previewLoaded: boolean = true;
  
  updatemember() {
    console.log(this.memberForm.status)
    if(this.memberForm.status === "VALID"){
      this.ms.updateMember(this.id, this.memberForm.value, this.token).subscribe(
        data => {
          alert('Successfully');
          this.memberForm.reset();
          this.r.navigate(['members'])
        },
        err => {
          alert('File is too large Please Change or resize');
        }
      )
    }
    
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        this.memberForm.reset();
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true
          this.memberForm.patchValue({
            img: reader.result
          })
        }
      }
    }
  }

  get a() { return this.memberForm.controls; }

  backtomember() {
    this.r.navigate(['members']
    )
  };
}
