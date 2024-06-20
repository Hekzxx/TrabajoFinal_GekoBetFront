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
import { LoginService } from '../../../services/login.service';
import { TeamService } from '../../../services/team.service';


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
export class InsertarticketComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ticket: Ticket = new Ticket();
  listaMatches: Match[] = [];
  listaUsers: User[] = [];

  edicion: boolean = false;
  id: number = 0;

  usuarioactual: string = "";
  loops: number = 0;



  constructor(
    private formBuilder: FormBuilder,
    private tS: TicketService,
    private mS: MatchService,
    private uS: UserService,
    private teS: TeamService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      username: ['', /*Validators.required*/],
      versus: ['', Validators.required],
      probabilidad: ['', /*[Validators.required, Validators.pattern('^[0-9 ]*$')]*/],
      equipoGanador: ['', /*[Validators.required, Validators.pattern('[a-zA-Z ]*')]*/],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
    this.mS.list().subscribe((data) => {
      this.listaMatches = data;
    });

    this.usuarioactual = this.loginService.showUser();
  }
  registrar(): void {
    if (this.form.valid) {
      this.uS.list().subscribe((listausuarios) => {
        for (let usuario of listausuarios) {

          this.ticket.match.id = this.form.value.versus;

          if (usuario.username == this.usuarioactual) {
            this.mS.getNombreEquipo(this.ticket.match.id).subscribe((listaequipos) => {
              for (let equipolistado of listaequipos) {
                if (this.loops==0) {
                  this.loops++;
                this.teS.list().subscribe((listateams) => {
                  for (let team of listateams) {
                    if (team.nameteam == equipolistado.nombreEQUIPO) {
                      
                      this.mS.getGolesdeEquipo(team.id).subscribe((golest1) => {
                        this.mS.getProbabilidadEquipo(golest1, this.ticket.match.id).subscribe((probabilidad) => {
                          //
                          this.mS.getNombreEquipo(this.ticket.match.id).subscribe((listaequipos2) => {
                            for (let equipolistado2 of listaequipos2) {
                              if (this.loops>0) {
                                this.loops++;
                                this.teS.list().subscribe((listateams2) => {
                                  for (let team2 of listateams2) {
                                    if (team2.nameteam == equipolistado2.nombreEQUIPO && team2.nameteam != team.nameteam) {
                                      
                                      this.mS.getGolesdeEquipo(team2.id).subscribe((golest2) => {
                                        this.mS.getProbabilidadEquipo(golest2, this.ticket.match.id).subscribe((probabilidad2) => {
                                          console.log('El partido de id ' + this.ticket.match.id + ' esta conformado por ' + team.nameteam)
                                          console.log('El partido de id ' + this.ticket.match.id + ' esta conformado por ' + team2.nameteam)
                                          console.log(probabilidad);
                                          console.log(probabilidad2);

                                          //Registro//
                                          this.ticket.id = this.form.value.codigo;
                                          this.ticket.user.id = usuario.id;
                                          this.ticket.match.id = this.form.value.versus;
                                          
                                          if (probabilidad>probabilidad2) 
                                            {
                                              this.ticket.probabilidad = probabilidad;
                                              this.ticket.equipoGanador = team.nameteam;
                                            }
                                          else 
                                          {
                                            this.ticket.probabilidad = probabilidad2;
                                            this.ticket.equipoGanador = team2.nameteam;
                                          }

                                          if (this.edicion==false)
                                            {
                                              this.tS.insert(this.ticket).subscribe((data) => {
                                                this.tS.list().subscribe((data) => {
                                                  this.tS.setList(data);
                                                });
                                              });
                                            }
                                            else
                                            {
                                              this.tS.update(this.ticket).subscribe((data) => {
                                                this.tS.list().subscribe((data) => {
                                                  this.tS.setList(data);
                                                });
                                              });
                                            }
                                          
                                          this.router.navigate(['listarticket']);
                                          
                                        })
                                      })
                                    }
                                  }
                                })
                              }
                              
                            }
                          })
                        })
                      })
                    }
                  }
                })

                }
                
              }
            })
          }
        }
      })
    }

    /*this.ticket.id = this.form.value.codigo;
    this.ticket.user.id = usuario.id;

    this.ticket.id = this.form.value.codigo;
    this.ticket.user.id = this.form.value.username;
    this.ticket.match.id = this.form.value.versus;
    this.ticket.probabilidad = this.form.value.probabilidad;
    this.ticket.equipoGanador = this.form.value.equipoGanador;
    this.tS.insert(this.ticket).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
    this.router.navigate(['listarticket']);*/

  }



  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
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
