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
import { Ligue } from '../../../models/Ligue';
import { Country } from '../../../models/Country';
import { Season } from '../../../models/Season';
import { SeasonService } from '../../../services/season.service';
import { CountryService } from '../../../services/country.service';
import { LigueService } from '../../../services/ligue.service';

@Component({
  selector: 'app-insertarligue',
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
  templateUrl: './insertarligue.component.html',
  styleUrl: './insertarligue.component.css'
})
export class InsertarligueComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  ligue: Ligue = new Ligue();
  listaCountries: Country[] = [];
  listaSeasons: Season[] = [];

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder : FormBuilder,
    private sS: SeasonService,
    private cS: CountryService,
    private lS: LigueService,
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
      year: ['', Validators.required],
      nameligue: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    });
    this.sS.list().subscribe((data) => {
      this.listaSeasons = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCountries = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.ligue.id= this.form.value.codigo;
      this.ligue.season.country.id = this.form.value.paiscountry;
      this.ligue.season.id = this.form.value.year;
      this.ligue.nameligue = this.form.value.nameligue;
      this.lS.insert(this.ligue).subscribe((data) => {
        this.lS.list().subscribe((data) => {
          this.lS.setList(data);
        });
      });
      this.router.navigate(['listarligue']);
    }
  }
  init(){
    if (this.edicion) {
      this.lS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          paiscountry: new FormControl({ value: data.season.country.id, disabled: this.edicion}),
          year: new FormControl(data.season.id),
          nameligue: new FormControl(data.nameligue),
        });
      });
    }
  }
}
