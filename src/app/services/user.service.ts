import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from '../../environments/environements';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url=`${base_url}/users`
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<User[]>(this.url);
  }
}
