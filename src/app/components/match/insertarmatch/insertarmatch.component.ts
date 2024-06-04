import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Match } from '../../../models/Match';
import { Router } from '@angular/router';
import { MatchService } from '../../../services/match.service';
@Component({
  selector: 'app-insertarmatch',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './insertarmatch.component.html',
  styleUrl: './insertarmatch.component.css',
})
export class InsertarmatchComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  match: Match = new Match();
  constructor(
    private formBuilder: FormBuilder,
    private mS: MatchService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      versus: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      fecha: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.match.versus = this.form.value.versus;
      this.match.dateMatch = this.form.value.fecha;

      this.mS.insert(this.match).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
      this.router.navigate(['listarmatch/insertarmatch']).then(() => {
        window.location.reload();
      });
    }
  }
}
