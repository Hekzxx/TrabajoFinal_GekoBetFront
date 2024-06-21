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
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-reporte02-arias',
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
  templateUrl: './reporte02-arias.component.html',
  styleUrl: './reporte02-arias.component.css'
})
export class Reporte02AriasComponent implements OnInit {
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
  constructor(private tS: TicketService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      namecountry: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    })
  }

  ngOnInit(): void {
    // Initial data load can be added here if needed
  }

  getCantidad(): void {
    if (this.form.valid) {
      const namecountry = this.form.value.namecountry;
      this.tS.CantidadTicketsPais(namecountry).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.cantidad_tickets.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad_tickets),
            label: 'Cantidad de Tickets',
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