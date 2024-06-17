import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Record } from '../models/Record';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private url =`${base_url}/Records`;
  private listacambio = new Subject<Record[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Record[]>(this.url);
  }
  insert(re: Record) {
    return this.httpClient.post(this.url, re);
  }
  setList(listaNueva: Record[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number) {
    return this.httpClient.get<Record>(`${this.url}/${id}`);
  }

  update(re:Record) {
    return this.httpClient.put(this.url, re);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
