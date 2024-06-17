import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { TeamXMatch } from '../../../models/TeamXMatch';
import { Team } from '../../../models/Team';
import { Match } from '../../../models/Match';
import { TeamService } from '../../../services/team.service';
import { TeamXMatchService } from '../../../services/team-xmatch.service';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-insertarteam-xmatch',
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
  templateUrl: './insertarteam-xmatch.component.html',
  styleUrl: './insertarteam-xmatch.component.css'
})
export class InsertarteamXmatchComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  teamxmatch: TeamXMatch = new TeamXMatch();
  listaTeam: Team[] = [];
  listaMatch: Match[] = [];

  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private tmS: TeamXMatchService,
    private tS: TeamService,
    private mS: MatchService,
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
      idteam: ['', Validators.required],
      idpartido: ['', Validators.required],
    });
    this.tS.list().subscribe((data) => {
      this.listaTeam = data;
    });
    this.mS.list().subscribe((data) => {
      this.listaMatch = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.teamxmatch.id= this.form.value.codigo;
      this.teamxmatch.team.id = this.form.value.idteam;
      this.teamxmatch.match.id = this.form.value.idpartido;
      this.tmS.insert(this.teamxmatch).subscribe((data) => {
        this.tmS.list().subscribe((data) => {
          this.tmS.setList(data);
        });
      });
      this.router.navigate(['listarteamsxmatches']);
    }
  }
  init(){
    if (this.edicion) {
      this.tmS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          idteam: new FormControl(data.team.id),
          idpartido: new FormControl(data.match.id),
        });
      });
    }
  }
}
