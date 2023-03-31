import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { MembersService } from 'src/app/services/members.service';


@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {

  titleList: string[] = ['นาย', 'นาง', 'นางสาว'];
  majorList: string[] = ['วิศวกรรมขนส่ง', 'วิศวกรรมการผลิต', 'วิศวกรรมไฟฟ้า', 'วิศวกรรมโยธา', 'วิศวกรรมสิ่งแวดล้อม', 'วิศวกรรมโลหะการ', 'วิศวกรรมธรณี', 'วิศวกรรมอิเล็กทรอนิกส์',
  'วิศวกรรมอุตสาหการ', 'วิศวกรรมเครื่องกล', 'วิศวกรรมเกษตร', 'วิศวกรรมคอมพิวเตอร์', 'วิศวกรรมเคมี', 'วิศวกรรมเซรามิก', 'วิศวกรรมโทรคมนาคม', 'วิศวกรรมพอลิเมอร์', 'วิศวกรรมอินเตอร์',];

  token:any;

  constructor(private ps:MembersService, public local : LocalStorageService) {
    
   }

  ngOnInit(): void {
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
    password : new FormControl('', [Validators.required])
  })
  previewLoaded: boolean = false;

  addMember() {
    this.memberForm.patchValue({password : this.memberForm.value.tell})
    this.ps.addMember(this.memberForm.value).subscribe(data => {
      console.log(data)
      alert('สมัครสมาชิกสำเร็จ ยินดีต้อนรับเข้าสู่ชมรมคอมพิวเตอร์')
      this.memberForm.reset();
    }, err => {
      console.log(err);

    })
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

  get a() { return this.memberForm.controls;}

  resetForm() {
    this.memberForm.reset();
    this.previewLoaded = false;
  }

}