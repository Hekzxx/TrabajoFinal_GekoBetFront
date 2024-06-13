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
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Match } from '../../../models/Match';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatchService } from '../../../services/match.service';
import { MatSelectModule } from '@angular/material/select';
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
    RouterLink,
    NgIf,
    MatSelectModule,
  ],
  templateUrl: './insertarmatch.component.html',
  styleUrl: './insertarmatch.component.css',
})

export class InsertarmatchComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  match: Match = new Match();

  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private mS: MatchService,
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
      versus: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      fecha: ['', Validators.required],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.match.id = this.form.value.codigo;
      this.match.versus = this.form.value.versus;
      this.match.dateMatch = this.form.value.fecha;

      this.mS.insert(this.match).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
      this.router.navigate(['listarmatch']);
    }
  }
  init(){
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          fecha: new FormControl(data.dateMatch),
          versus: new FormControl(data.versus),
        });
      });
    }
  }
}
