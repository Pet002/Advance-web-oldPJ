import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signin() {
    console.log(this.authForm.value)
    this.auth.signIn(this.authForm.value).subscribe(
      data => {
        if (data.status == true) {
          this.router.navigate(['/members']);
          console.log('go next')
        }
      },
      err => {
        console.log(err);
        alert('User or password is incorrect!');
      }
    );
  }

  
}
