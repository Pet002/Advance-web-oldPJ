import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  token:any;

  constructor(private auth: AuthService, private router: Router, public local : LocalStorageService) {
    try {
      this.token = this.local.get('user').token
    } catch (error) {
      this.router.navigate(['home'])
    }
   }

  ngOnInit(): void {
  }


  signup() {
    this.auth.signUp(this.authForm.value, this.token).subscribe(
      data => {
        alert(data.message)
        this.router.navigate(['home'])
      },
      err => {
        alert('Sign Up failure!!!')
      }
    )
  }

}
