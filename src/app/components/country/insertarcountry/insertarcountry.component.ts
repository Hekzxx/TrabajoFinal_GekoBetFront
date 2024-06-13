import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CountryService } from '../../../services/country.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Country } from '../../../models/Country';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertarcountry',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './insertarcountry.component.html',
  styleUrl: './insertarcountry.component.css',
})
export class InsertarcountryComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  country: Country = new Country();

  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private cS: CountryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      pais: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.country.id = this.form.value.codigo;
      this.country.namecountry = this.form.value.pais;

      this.cS.insert(this.country).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['listarcountry']);
    }
  }
  init(){
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          pais: new FormControl(data.namecountry),
        });
      });
    }
  }
}
