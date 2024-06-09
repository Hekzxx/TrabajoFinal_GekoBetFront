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
import { Role } from '../../../models/Role';
import { User } from '../../../models/User';
import { RoleService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-insertarrole',
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
  templateUrl: './insertarrole.component.html',
  styleUrl: './insertarrole.component.css'
})
export class InsertarroleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  role: Role = new Role();
  listaUsers: User[] = [];

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RoleService,
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
      user: ['', Validators.required],
      tipo: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }


  registrar(): void {
    if (this.form.valid) {
      this.role.id= this.form.value.codigo;
      this.role.user.id = this.form.value.user;
      this.role.tipo = this.form.value.tipo;
      this.rS.insert(this.role).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['listarrole']);
    }
  }

  init(){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          user: new FormControl(data.user.id),
          tipo: new FormControl(data.tipo),
        });
      });
    }
  }


}
