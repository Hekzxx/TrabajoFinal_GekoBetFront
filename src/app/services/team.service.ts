import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Team } from '../models/Team';
import { queryTeamCantEquipoTempActualDTO } from '../models/queryTeamCantEquipoTempActualDTO';
import { queryTeamEquiposFavXPaisDTO } from '../models/queryTeamEquiposFavXPaisDTO';
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

  //Maycol
  equipos_temporada_actual(): Observable<queryTeamCantEquipoTempActualDTO[]>{
    return this.httpClient.get<queryTeamCantEquipoTempActualDTO[]>(
      `${this.url}/Equipos_Temporada_Actual`
    );
  }

  //Maycol
  equipos_favoritos_pais(pais_ingresado:string, id_usuario:number): Observable<queryTeamEquiposFavXPaisDTO[]>{
    return this.httpClient.get<queryTeamEquiposFavXPaisDTO[]>(
      `${this.url}/Equipos_Favoritos_X_Pais/${pais_ingresado}/${id_usuario}`
    );
  }
}
