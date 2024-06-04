import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CountryService } from '../../../services/country.service';
import { Router } from '@angular/router';
import { Country } from '../../../models/Country';

@Component({
  selector: 'app-insertarcountry',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './insertarcountry.component.html',
  styleUrl: './insertarcountry.component.css'
})
export class InsertarcountryComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  country: Country = new Country();

  constructor(
    private formBuilder: FormBuilder,
    private cS: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pais: [
        '',
        [
          Validators.required, Validators.pattern('[a-zA-Z]*'),
        ]
      ],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.country.namecountry = this.form.value.pais;

      this.cS.insert(this.country).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['listarcountry/insertarcountry']).then(() => {
        window.location.reload();
      })
    }
  }

}
