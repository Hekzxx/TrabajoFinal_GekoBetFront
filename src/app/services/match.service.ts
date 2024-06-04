import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Match } from '../models/Match';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private url=`${base_url}/Matches`
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Match[]>(this.url);
  }
}
