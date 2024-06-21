import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { queryMatchEquipoXTempDTO } from '../../../models/queryMatchEquipoXTempDTO';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-reporte01-julio',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reporte01-julio.component.html',
  styleUrl: './reporte01-julio.component.css',
})
export class Reporte01JulioComponent implements OnInit {
  dataSource: MatTableDataSource<queryMatchEquipoXTempDTO> =
    new MatTableDataSource();
  form: FormGroup;
  displayedColumns: string[] = ['nameteam', 'year'];

  constructor(private mS: MatchService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      year: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(2024),
          Validators.max(2030),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  getCantidad(): void {
    if (this.form.valid) {
      const year = this.form.value.year;
      this.mS.PartidosLigaJulio(year).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
