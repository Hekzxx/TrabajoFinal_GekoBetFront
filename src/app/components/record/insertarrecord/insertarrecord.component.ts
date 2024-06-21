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
import { Record } from '../../../models/Record';
import moment from 'moment';
import { Team } from '../../../models/Team';
import { TeamService } from '../../../services/team.service';
import { RecordService } from '../../../services/record.service';

@Component({
  selector: 'app-insertarrecord',
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
  templateUrl: './insertarrecord.component.html',
  styleUrl: './insertarrecord.component.css'
})
export class InsertarrecordComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  record: Record = new Record();
  listaTeam: Team[] = [];
  maxFecha: Date = moment().add(0, 'days').toDate();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RecordService,
    private tS: TeamService,
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
      nameTeam: ['', Validators.required],
      fecha: ['', Validators.required],
      resultado: ['', [Validators.required, Validators.pattern(/^[0-5]$/)]],
      
    });
    this.tS.list().subscribe((data) => {
      this.listaTeam = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.record.id= this.form.value.codigo;
      this.record.team.id = this.form.value.nameTeam;
      this.record.dateRecord = this.form.value.fecha;
      this.record.resultado = this.form.value.resultado;
      this.rS.insert(this.record).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['listarrecord']);
    }
  }
  init(){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data)=>{
        this.form.setValue({
          codigo: data.id,
          nameTeam: data.team.id,
          fecha: data.dateRecord,
          resultado: data.resultado,
        });
      });
    }
  }
}
