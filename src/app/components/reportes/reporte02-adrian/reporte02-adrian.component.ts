import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-reporte02-adrian',
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
  ],
  templateUrl: './reporte02-adrian.component.html',
  styleUrl: './reporte02-adrian.component.css'
})
export class Reporte02AdrianComponent implements OnInit{
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

  form: FormGroup;
  constructor(private mS: MatchService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      nameligue: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    })
  }

  ngOnInit(): void {
    // Initial data load can be added here if needed
  }

  getCantidad(): void {
    if (this.form.valid) {
      const nameligue = this.form.value.nameligue;
      this.mS.PartidosLiga(nameligue).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.cantidad_partidos_jugados.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad_partidos_jugados),
            label: 'Cantidad de partidos jugados',
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