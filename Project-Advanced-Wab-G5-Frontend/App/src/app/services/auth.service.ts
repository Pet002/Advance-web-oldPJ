import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public local:LocalStorageService) { }

  signIn(authData: any){
    return this.http.post<any>('http://localhost:3000/login/signin', authData)
    .pipe(map(data =>{
        if(data){
          this.local.set('user', data, 1, 'w');
          console.log(this.local.get('user'));
        }
        return data;
    }));
  }

  signUp(authData: any, token:any){
    const headers = { 'Authorization': token }
    return this.http.post<any>('http://localhost:3000/user/signup',authData, { headers })
    .pipe(map(data =>{
      if(data){
       
      }
      return data;
  }));
  }
}
