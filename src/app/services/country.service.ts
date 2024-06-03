import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Country } from '../models/Country';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url=`${base_url}/countries`
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Country[]>(this.url);
  }
}
