import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Reporte01AdrianComponent } from './reporte01-adrian/reporte01-adrian.component';
import { Reporte01AriasComponent } from './reporte01-arias/reporte01-arias.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, Reporte01AriasComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  constructor(public route: ActivatedRoute){}
    ngOnInit(): void {
    }
}
