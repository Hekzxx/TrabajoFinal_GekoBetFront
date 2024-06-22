import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Ligue } from '../models/Ligue';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { queryLigueLiguesXSeasonXTempDTO } from '../models/queryLigueLiguesXSeasonXTempDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class LigueService {
  private url =`${base_url}/ligues`;
  private listacambio = new Subject<Ligue[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Ligue[]>(this.url);
  }
  insert(li: Ligue) {
    return this.httpClient.post(this.url, li);
  }
  setList(listaNueva: Ligue[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number) {
    return this.httpClient.get<Ligue>(`${this.url}/${id}`);
  }

  update(li:Ligue) {
    return this.httpClient.put(this.url, li);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  //Julio
  ligas_season_country(anio_ingresado:number, pais_ingresado:string): Observable<queryLigueLiguesXSeasonXTempDTO[]>{
    return this.httpClient.get<queryLigueLiguesXSeasonXTempDTO[]>(
      `${this.url}/Ligas_x_Tempo_Pais/${anio_ingresado}/${pais_ingresado}`
    );
  }
}
