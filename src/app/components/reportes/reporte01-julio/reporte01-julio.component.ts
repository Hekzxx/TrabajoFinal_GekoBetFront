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
import { MatSelectModule } from '@angular/material/select';
import { Season } from '../../../models/Season';
import { SeasonService } from '../../../services/season.service';

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
    MatSelectModule,
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
  listaSeasons: Season[] = [];
  displayedColumns: string[] = ['nameteam', 'year'];

  constructor(private mS: MatchService, private formBuilder: FormBuilder, private sS: SeasonService) {
    this.form = formBuilder.group({
      year: ['',
        [
          Validators.required
        ]],
    });
  }

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.listaSeasons = data;
    });
  }

  getCantidad(): void {
    if (this.form.valid) {
      const year = this.form.value.year;
      this.mS.PartidosLigaJulio(year).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
