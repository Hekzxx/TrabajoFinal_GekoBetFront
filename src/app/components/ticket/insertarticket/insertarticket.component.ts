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
import { Ticket } from '../../../models/Ticket';
import { Match } from '../../../models/Match';
import { User } from '../../../models/User';
import { TicketService } from '../../../services/ticket.service';
import { UserService } from '../../../services/user.service';
import { MatchService } from '../../../services/match.service';


@Component({
  selector: 'app-insertarticket',
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
  templateUrl: './insertarticket.component.html',
  styleUrl: './insertarticket.component.css'
})
export class InsertarticketComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  ticket: Ticket = new Ticket();
  listaMatches: Match[] = [];
  listaUsers: User[] = [];

  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private tS: TicketService,
    private mS: MatchService,
    private uS: UserService,
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
      username: ['', Validators.required],
      versus: ['', Validators.required],
      probabilidad: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
      equipoGanador: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
    this.mS.list().subscribe((data) => {
      this.listaMatches = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.ticket.id= this.form.value.codigo;
      this.ticket.user.id = this.form.value.username;
      this.ticket.match.id = this.form.value.versus;
      this.ticket.probabilidad = this.form.value.probabilidad;
      this.ticket.equipoGanador = this.form.value.equipoGanador;
      this.tS.insert(this.ticket).subscribe((data) => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
      this.router.navigate(['listarticket']);
    }
  }
  init(){
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          username: new FormControl(data.user.id),
          versus: new FormControl(data.match.id),
          probabilidad: new FormControl(data.probabilidad),
          equipoGanador: new FormControl(data.equipoGanador)
        });
      });
    }
  }

}
