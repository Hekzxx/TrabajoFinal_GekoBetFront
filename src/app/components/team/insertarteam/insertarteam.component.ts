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
import { Team } from '../../../models/Team';
import { Ligue } from '../../../models/Ligue';
import { TeamService } from '../../../services/team.service';
import { LigueService } from '../../../services/ligue.service';

@Component({
  selector: 'app-insertarteam',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './insertarteam.component.html',
  styleUrl: './insertarteam.component.css'
})
export class InsertarteamComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  Team: Team = new Team();
  listaLigue: Ligue[] = [];

  edicion: boolean = false;
  id: number = 0;
  
  constructor(
    private formBuilder: FormBuilder,
    private st: TeamService,
    private Sl: LigueService,
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
      LigaLigue: ['', Validators.required],
      nameTeam: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
    });
    this.Sl.list().subscribe((data) => {
      this.listaLigue = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.Team.id= this.form.value.codigo;
      this.Team.ligue.id = this.form.value.LigaLigue;
      this.Team.nameteam = this.form.value.nameTeam;
      this.st.insert(this.Team).subscribe((data) => {
        this.st.list().subscribe((data) => {
          this.st.setList(data);
        });
      });
      this.router.navigate(['listarteam']);
    }
  }

  init(){
    if (this.edicion) {
      this.st.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          LigaLigue: new FormControl(data.ligue.id),
          nameTeam: new FormControl(data.nameteam),
        });
      });
    }
  }
}
