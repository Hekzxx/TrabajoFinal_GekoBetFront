import { Component, OnInit } from '@angular/core';

import { TicketService } from '../../../services/ticket.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-reporte01-adrian',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte01-adrian.component.html',
  styleUrl: './reporte01-adrian.component.css'
})
export class Reporte01AdrianComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: TicketService) {}

  ngOnInit(): void {
    this.tS.probabilidadesPais().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre_equipo);
      this.barChartData = [
        {
          data: data.map((item) => item.promedio_probabilidad),
          label: 'Promedio de Probabilidad',
          backgroundColor: [
            '#0094d3',
            '#4169c7',
            '#0000CD',
            '#9BBB59',
            '#8064A2',
            '#4BACC6',
            '#4F81BC',
            '#C0504D',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}