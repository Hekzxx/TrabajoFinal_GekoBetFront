import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Favorite } from '../models/Favorite';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private url =`${base_url}/favorities`;
  private listacambio = new Subject<Favorite[]>();

  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Favorite[]>(this.url);
  }
  insert(fe: Favorite) {
    return this.httpClient.post(this.url, fe);
  }
  setList(listaNueva: Favorite[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number) {
    return this.httpClient.get<Favorite>(`${this.url}/${id}`);
  }

  update(fe:Favorite) {
    return this.httpClient.put(this.url, fe);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
