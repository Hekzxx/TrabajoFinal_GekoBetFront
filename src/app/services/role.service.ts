import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role';
import { environment } from '../../environments/environements';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${base_url}/users`
  private listacambio = new Subject<Role[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Role[]>(this.url);
  }
  insert(ro: Role) {
    return this.http.post(this.url, ro);
  }
  setList(listaNueva: Role[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable()
  }


  listId(id:number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }

  update(ro:Role) {
    return this.http.put(this.url, ro);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
