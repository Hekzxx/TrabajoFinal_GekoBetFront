import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-reporte01-maycol',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte01-maycol.component.html',
  styleUrl: './reporte01-maycol.component.css'
})
export class Reporte01MaycolComponent implements OnInit{
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
  constructor(private tS: TeamService) {}

  ngOnInit(): void {
    this.tS.equipos_temporada_actual().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.cantidad_equipo_temporada.toString());
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_equipo_temporada),
          label: 'Cantidad de equipos',
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
