import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [RouterOutlet,ListarComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit{
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {

  }
}
