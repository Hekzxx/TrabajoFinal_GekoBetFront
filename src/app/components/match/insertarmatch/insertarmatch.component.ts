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
import moment from 'moment';
import { TeamService } from '../../../services/team.service';
import { TeamXMatchService } from '../../../services/team-xmatch.service';
import { Team } from '../../../models/Team';
import { TeamXMatch } from '../../../models/TeamXMatch';
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
  teamxmatch: TeamXMatch = new TeamXMatch();
  minFecha: Date = moment().add(0, 'days').toDate();

  edicion: boolean = false;
  id: number = 0;

  idteam1: number = 0;
  idteam2: number = 0;

  mensaje: string = '';

  listaTeams1: Team[] = [];
  listaTeams2: Team[] = [];
  listaTeamsXMatches: TeamXMatch[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private mS: MatchService,
    private router: Router,
    private route: ActivatedRoute,
    private teS: TeamService,
    private txmS: TeamXMatchService


  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      idteam1: ['', [Validators.required]],
      idteam2: ['', [Validators.required]],
      versus: ['', /*[Validators.required, Validators.pattern('[a-zA-Z ]*')]*/],
      fecha: ['', Validators.required],
    });
    this.teS.list().subscribe((data) => {
      this.listaTeams1 = data;
    });
    this.teS.list().subscribe((data) => {
      this.listaTeams2 = data;
    });
  }

  registrar(): void {
    if (this.form.valid) {

      this.idteam1 = this.form.value.idteam1;
      this.idteam2 = this.form.value.idteam2;

      if (this.idteam1 != this.idteam2) {

        this.mensaje = 'Cargando...';

        this.teS.list().subscribe((listateams1) => {
          for (let team1 of listateams1) {
            if (team1.id == this.idteam1) {
              //
              this.teS.list().subscribe((listateams2) => {
                for (let team2 of listateams2) {
                  if (team2.id == this.idteam2) {

                    console.log('El equipo 1 es ' + team1.nameteam);
                    console.log('El equipo 2 es ' + team2.nameteam);

                    this.match.id = this.form.value.codigo;
                    this.match.versus = team1.nameteam + ' vs ' + team2.nameteam
                    this.match.dateMatch = this.form.value.fecha;

                    this.mS.insert(this.match).subscribe((data) => {
                      this.mS.list().subscribe((data) => {
                        this.mS.setList(data);

                        if (this.edicion == false) {

                          this.mS.UltimoMatchCreado().subscribe((idmatch) => {
                            this.teamxmatch.team.id = this.form.value.idteam1;
                            this.teamxmatch.match.id = idmatch;

                            this.txmS.insert(this.teamxmatch).subscribe()

                            this.teamxmatch.team.id = this.form.value.idteam2;
                            this.teamxmatch.match.id = idmatch;

                            this.txmS.insert(this.teamxmatch).subscribe()
                          })
                        }
                      });
                    });
                    this.router.navigate(['listarmatch']);
                  }
                }
              });

            }
          }
        });
      }
      else {
        this.mensaje = 'Los equipos no pueden ser los mismos';
      }


    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form.setValue({
          codigo: data.id,
          fecha: data.dateMatch,
          versus: data.versus,
        });
      });
    }
  }
}
