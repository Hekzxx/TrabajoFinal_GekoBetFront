import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MatchService } from '../../../services/match.service';
import { MatInputModule } from '@angular/material/input';
import { SeasonService } from '../../../services/season.service';
import { Season } from '../../../models/Season';

@Component({
  selector: 'app-reporte01-arias',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './reporte01-arias.component.html',
  styleUrl: './reporte01-arias.component.css'
})
export class Reporte01AriasComponent implements OnInit{
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
  listaSeasons: Season[] = [];
  

  form: FormGroup;
  constructor(private mS: MatchService, private formBuilder: FormBuilder, private sS:SeasonService) {
    this.form = formBuilder.group({
      year: ['', 
        [
         Validators.required/*, 
         Validators.pattern('^[0-9]*$'),
         Validators.min(2024),
         Validators.max(2030),*/
        ]],
    })
  }

  ngOnInit(): void {
    // Initial data load can be added here if needed
    this.sS.list().subscribe((data) => {
      this.listaSeasons = data;
    });
  }

  getCantidad(): void {
    if (this.form.valid) {
      const year = this.form.value.year;
      this.mS.CantidadPartidosTemporada(year).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.cantidad_partidos.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad_partidos),
            label: 'Cantidad de partidos',
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
}