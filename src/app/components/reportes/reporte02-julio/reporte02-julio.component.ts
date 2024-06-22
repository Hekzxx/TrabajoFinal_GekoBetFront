import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { queryLigueLiguesXSeasonXTempDTO } from '../../../models/queryLigueLiguesXSeasonXTempDTO';
import { Season } from '../../../models/Season';
import { Country } from '../../../models/Country';
import { LigueService } from '../../../services/ligue.service';
import { CountryService } from '../../../services/country.service';
import { SeasonService } from '../../../services/season.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reporte02-julio',
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
    MatSelectModule,
    NgIf
  ],
  templateUrl: './reporte02-julio.component.html',
  styleUrl: './reporte02-julio.component.css'
})
export class Reporte02JulioComponent implements OnInit{
  dataSource: MatTableDataSource<queryLigueLiguesXSeasonXTempDTO> = new MatTableDataSource();
  form: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['nameligue', 'year', 'namecountry'];
  listaSeason: Season[] =[];
  listaCountries: Country[] = [];

  constructor(
    private lS: LigueService,
    private cS: CountryService,
    private sS: SeasonService,
    private formBuilder: FormBuilder,
    
  ) {
    this.form = formBuilder.group({
      year: ['' ,[Validators.required]],
      namecountry: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.listaSeason = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCountries = data;
    });
  }

  getCantidad(): void {
    if (this.form.valid) {
      const year = this.form.value.year;
      const namecountry = this.form.value.namecountry;
      this.lS.ligas_season_country(year, namecountry).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    };
  }
}