import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Match } from '../models/Match';
import { Observable, Subject } from 'rxjs';
import { queryMatchObtenerEquipoSegunPartidoDTO } from '../models/queryMatchObtenerEquipoSegunPartidoDTO';
import { queryMatchPartidosXTemporadaDTO } from '../models/queryMatchPartidosXTemporadaDTO';
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

  getProbabilidadEquipo(teamrecord:number, idmatchinggresado:number) {
    return this.http.get<number>(`${this.url}/ProbabilidadEquipo/${teamrecord}/${idmatchinggresado}`)
  }

  getGolesdeEquipo(idteam:number) {
    return this.http.get<number>(`${this.url}/GolesdeEquipo/${idteam}`)
  }

  getNombreEquipo(idm:number) :Observable<queryMatchObtenerEquipoSegunPartidoDTO[]>{
    return this.http.get<queryMatchObtenerEquipoSegunPartidoDTO[]>(
      `${this.url}/EquiposSegunPartido/${idm}`
    );
  }

  UltimoMatchCreado() :Observable<number>{
    return this.http.get<number>(`${this.url}/last`)
  }

  CantidadPartidosTemporada(anio_ingresado:number) :Observable<queryMatchPartidosXTemporadaDTO[]>{
    return this.http.get<queryMatchPartidosXTemporadaDTO[]>(
      `${this.url}/Partidos_por_temporada/${anio_ingresado}`
    );
  }
}
