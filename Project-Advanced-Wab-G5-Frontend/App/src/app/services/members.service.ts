import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Member } from '../Member';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private member = Member;
  constructor(private http: HttpClient) { }
  getAllMember(token: any) {
    const headers = { 'Authorization': token }
    return this.http.get<any>('http://localhost:3000/member/getmember', { headers })
      .pipe(map(data => {
        if (data) {
          this.member = data;
          console.log(data);
        }
        return data;
      }));
  }

  getOneMember(id:any, token:any){
    const headers = { 'Authorization': token }
    return this.http.get('http://localhost:3000/member/getmember/' + id,  { headers })
      .pipe(map(data => {
        if(data){
          return data
        }
        return data
      }))
  }

  setter(member: Member) {
    this.member = Member;
  }

  getter() {
    return this.member;
  }

  deleteMember(member: any, token:any) {
    const headers = { 'Authorization': token }
    return this.http.post<any>('http://localhost:3000/member/deletemember', member, { headers })
      .pipe(map(data => {
        console.log(data)
        return data;
      }))
  }

  updateMember(id:any, eventData:any, token:any ){
    const headers = { 'Authorization': token }
    return this.http.put<any>('http://localhost:3000/member/update/' + id , eventData, { headers })
    .pipe(map(data => {
      return data
    }))
  }

  addMember(member: any) {
    return this.http.post<any>('http://localhost:3000/member/addmember', member)
      .pipe(map(data => {
        return data
      }))
  }
  
}