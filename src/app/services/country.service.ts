import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Country } from '../models/Country';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = `${base_url}/countries`
  private listacambio = new Subject<Country[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Country[]>(this.url);
  }
  insert(co: Country) {
    return this.http.post(this.url, co);
  }
  setList(listaNueva: Country[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable()
  }
}
