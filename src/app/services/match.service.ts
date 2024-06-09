import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Match } from '../models/Match';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private url = `${base_url}/Matches`
  private listacambio = new Subject<Match[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Match[]>(this.url);
  }
  insert(ma: Match) {
    return this.http.post(this.url, ma);
  }
  setList(listaNueva: Match[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable()
  }

  listId(id:number) {
    return this.http.get<Match>(`${this.url}/${id}`);
  }

  update(ro:Match) {
    return this.http.put(this.url, ro);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
