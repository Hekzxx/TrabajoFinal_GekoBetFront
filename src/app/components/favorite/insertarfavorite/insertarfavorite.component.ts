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
import { Favorite } from '../../../models/Favorite';
import { User } from '../../../models/User';
import { Team } from '../../../models/Team';
import { FavoriteService } from '../../../services/favorite.service';
import { UserService } from '../../../services/user.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-insertarfavorite',
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
    MatInputModule,
  ],
  templateUrl: './insertarfavorite.component.html',
  styleUrl: './insertarfavorite.component.css'
})
export class InsertarfavoriteComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  favorite: Favorite = new Favorite();
  listaUsers: User[] = [];
  listaTeams: Team[] = [];

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sF: FavoriteService,
    private sU: UserService,
    private sT: TeamService,
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
      UsurioUser: ['', Validators.required],
      Equiposteam: ['', Validators.required],
    });
    this.sU.list().subscribe((data) => {
      this.listaUsers = data;
    });
    this.sT.list().subscribe((data) => {
      this.listaTeams = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.favorite.id= this.form.value.codigo;
      this.favorite.user.id = this.form.value.UsurioUser;
      this.favorite.team.id = this.form.value.Equiposteam;
      this.sF.insert(this.favorite).subscribe((data) => {
        this.sF.list().subscribe((data) => {
          this.sF.setList(data);
        });
      });
      this.router.navigate(['listarfavorite']);
    }
  }

  init(){
    if (this.edicion) {
      this.sF.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          UsurioUser: new FormControl(data.user.id),
          Equiposteam: new FormControl(data.team.id),
        });
      });
    }
  }
}
