import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class EventServicesService {

  constructor(private http : HttpClient) { }

  event:any;

  addEvent(eventData:any, token:any){
    const headers = { 'Authorization': token }
    return this.http.post<any>('http://localhost:3000/event/add' , eventData , { headers })
    .pipe(map(data => {
      return data
    }))
  }

  getOneEvent(id:any,token:any){
    const headers = { 'Authorization': token }
    return this.http.get<any>('http://localhost:3000/event/getone/' + id , {headers})
    .pipe(map(data => {
      return data
    }))

  }

  getEvent(){
    return this.http.get<any>('http://localhost:3000/event/get')
    .pipe(map(data => {
      if(data){
        this.event = data
        return this.event
      }
      return this.event
    }))
  }

  deleteEvent(id:any, token:any){
    const headers = { 'Authorization': token }
    return this.http.delete<any>('http://localhost:3000/event/delete/' + id._id, {headers})
    .pipe(map(data =>{
      if(data){
        this.event = data
        return this.event
      }
      return this.event
    }))
  }


  updateEvent(id:any, eventData:any, token:any ){
    const headers = { 'Authorization': token }
    return this.http.put<any>('http://localhost:3000/event/update/' + id , eventData, { headers })
    .pipe(map(data => {
      return data
    }))
  }


}
