import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { TeamXMatch } from '../models/TeamXMatch';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TeamXMatchService {
  private url =`${base_url}/teamsxmatches`;
  private listacambio = new Subject<TeamXMatch[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<TeamXMatch[]>(this.url);
  }
  insert(tm: TeamXMatch) {
    return this.httpClient.post(this.url, tm);
  }
  setList(listaNueva: TeamXMatch[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number) {
    return this.httpClient.get<TeamXMatch>(`${this.url}/${id}`);
  }

  update(tm:TeamXMatch) {
    return this.httpClient.put(this.url, tm);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
