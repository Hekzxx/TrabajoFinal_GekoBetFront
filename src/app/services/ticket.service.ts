import { Injectable } from '@angular/core';
import { environment } from '../../environments/environements';
import { Observable, Subject } from 'rxjs';
import { Ticket } from '../models/Ticket';
import { HttpClient } from '@angular/common/http';
import { queryTicketTicketXTeamDTO } from '../models/queryTicketTicketXTeamDTO';
import { queryTicketTicketsXPaisDTO } from '../models/queryTicketTicketsXPaisDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private url = `${base_url}/tickets`
  private listacambio = new Subject<Ticket[]>();
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Ticket[]>(this.url);
  }
  insert(ti: Ticket) {
    return this.httpClient.post(this.url, ti);
  }
  setList(listaNueva: Ticket[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number) {
    return this.httpClient.get<Ticket>(`${this.url}/${id}`);
  }

  update(ti:Ticket) {
    return this.httpClient.put(this.url, ti);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  //adrian
  probabilidadesPais(): Observable<queryTicketTicketXTeamDTO[]>{
    return this.httpClient.get<queryTicketTicketXTeamDTO[]>(
      `${this.url}/Probabilidad_por_equipo`
    );
  }
  //arias
  CantidadTicketsPais(pais_ingresado:number) :Observable<queryTicketTicketsXPaisDTO[]>{
    return this.httpClient.get<queryTicketTicketsXPaisDTO[]>(
      `${this.url}/Tickets_por_pais/${pais_ingresado}`
    );
  }
}
