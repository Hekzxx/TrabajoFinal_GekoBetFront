import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Team } from '../models/Team';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url =`${base_url}/teams`;
  private listacambio = new Subject<Team[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Team[]>(this.url);
  }
  insert(te: Team) {
    return this.httpClient.post(this.url, te);
  }
  setList(listaNueva: Team[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number) {
    return this.httpClient.get<Team>(`${this.url}/${id}`);
  }

  update(te:Team) {
    return this.httpClient.put(this.url, te);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
