import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Season } from '../models/Season';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environements';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private url =`${base_url}/seasons`;
  private listacambio = new Subject<Season[]>();

  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Season[]>(this.url);
  }
  insert(se: Season) {
    return this.httpClient.post(this.url, se);
  }
  setList(listaNueva: Season[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number) {
    return this.httpClient.get<Season>(`${this.url}/${id}`);
  }

  update(se:Season) {
    return this.httpClient.put(this.url, se);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
