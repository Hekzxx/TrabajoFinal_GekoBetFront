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
import { Country } from '../../../models/Country';
import { Season } from '../../../models/Season';
import { CountryService } from '../../../services/country.service';
import { SeasonService } from '../../../services/season.service';

@Component({
  selector: 'app-insertarteam',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './insertarteam.component.html',
  styleUrl: './insertarteam.component.css'
})
export class InsertarteamComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  team: Team = new Team();
  listaLigue: Ligue[] = [];

  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private lS: LigueService,
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
      LigaLigue: ['', Validators.required],
      nameTeam: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
    });
    this.lS.list().subscribe((data) => {
      this.listaLigue = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.team.id= this.form.value.codigo;
      this.team.ligue.id = this.form.value.LigaLigue;
      this.team.nameteam = this.form.value.nameTeam;
      this.tS.insert(this.team).subscribe((data) => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
      this.router.navigate(['listarteam']);
    }
  }
  init(){
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data)=>{
        this.form.setValue({
          codigo: data.id,
          LigaLigue: data.ligue.id,
          nameTeam: data.nameteam,
        });
      });
    }
  }
}
