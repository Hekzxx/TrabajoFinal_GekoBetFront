import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from '../../environments/environements';
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${base_url}/users`
  private listacambio = new Subject<User[]>();
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<User[]>(this.url);
  }
  insert(us: User) {
    return this.http.post(this.url, us);
  }
  setList(listaNueva: User[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable()
  }


  listId(id:number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  listarUsuarioPorId(id:number) {
    return this.http.get<User[]>(`${this.url}/listar/${id}`);
  }

  update(us:User) {
    return this.http.put(this.url, us);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  //adrian
  idUsuario(username:string): Observable<number>{
    return this.http.get<number>(
      `${this.url}/idUser/${username}`
    );
  }

  ultimousuariocreado(): Observable<number>{
    return this.http.get<number>(
      `${this.url}/last`
    );
  }

}
