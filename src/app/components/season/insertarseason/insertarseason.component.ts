import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Season } from '../../../models/Season';
import { Country } from '../../../models/Country';
import { SeasonService } from '../../../services/season.service';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-insertarseason',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './insertarseason.component.html',
  styleUrl: './insertarseason.component.css'
})
export class InsertarseasonComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  season: Season = new Season();
  listaCountries: Country[] = [];

  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private sS: SeasonService,
    private cS: CountryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      paiscountry: ['', Validators.required],
      year: ['', 
        [
         Validators.required,
         Validators.pattern('^[0-9]*$'),
         Validators.min(2024),
         Validators.max(2030),
        ]],
    });
    this.cS.list().subscribe((data) => {
      this.listaCountries = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.season.id= this.form.value.codigo;
      this.season.country.id = this.form.value.paiscountry;
      this.season.year = this.form.value.year;
      this.sS.insert(this.season).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });
      this.router.navigate(['listarseason']);
    }
  }
  
  init(){
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          paiscountry: new FormControl(data.country.id),
          year: new FormControl(data.year),
        });
      });
    }
  }
}
