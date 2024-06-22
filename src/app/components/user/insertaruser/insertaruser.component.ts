import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import * as bcrypt from 'bcryptjs';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/Role';


@Component({
  selector: 'app-insertaruser',
  standalone: true,
  imports: [
    MatFormFieldModule,
     ReactiveFormsModule,
     CommonModule,
     MatSelectModule,
     MatButtonModule,
     MatInputModule,
     RouterLink,
     NgIf
  ],
  templateUrl: './insertaruser.component.html',
  styleUrl: './insertaruser.component.css'
})
export class InsertaruserComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  user: User = new User()
  edicion: boolean = false;
  password: any;
  id: number = 0;
  mensaje: string = '';
  tipoRol: Role = new Role();
  userIdRol: number = 0;
  listaestados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Activo' },
    { value: false, viewValue: 'Inactivo' }
  ]


  constructor(
    private formBuilder: FormBuilder,
    private uS: UserService,
    private rS: RoleService,
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
      username: ['', Validators.required],
      password: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      estado: ['true', Validators.required],
      address: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(9),
          Validators.maxLength(9)
        ]
      ],
      dni: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
          Validators.maxLength(8)
        ]],
      enabled: ['true', Validators.required]
    })

  }

  insertarrol(iduser:number){

    this.tipoRol.id = 0;
    this.tipoRol.tipo = 'USER';
    this.tipoRol.user.id = iduser;
    console.log('User ID TU:', this.tipoRol.user.id);

    this.rS.insert(this.tipoRol).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    },
    (error) => {
      console.log('Insersicion Fallida!!!');
    }
    );
  }


  registrar(): void {
    if (this.form.valid) {
      this.user.id = this.form.value.codigo
      this.user.username = this.form.value.username
      const salt = bcrypt.genSaltSync(10);
      this.user.password = bcrypt.hashSync(this.form.value.password, salt);
      this.user.mail = this.form.value.mail
      this.user.estado = this.form.value.estado
      this.user.address = this.form.value.address
      this.user.phone = this.form.value.phone
      this.user.dni = this.form.value.dni
      this.user.enabled = this.form.value.enabled

      this.uS.list().subscribe(listausuarios => {
        let camposunicos: boolean = true;
        for (let u of listausuarios) {
          if (this.form.value.username == u.username && this.form.value.id != u.id) {
            camposunicos = false;
            this.mensaje = "El nombre de usuario ya existe"
          }
          if (this.form.value.mail == u.mail && this.form.value.id != u.id) {
            camposunicos = false;
            this.mensaje = "El email ya está asociado con otra cuenta"
          }
        }
        if (camposunicos==true) {
          this.uS.insert(this.user).subscribe((data) => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data)

              this.uS.ultimousuariocreado().subscribe((lastid)=>{
                this.tipoRol.tipo = 'USER';
                this.tipoRol.user.id = lastid;
                console.log('User ID TU:', this.tipoRol.user.id);
                
            
                this.rS.insert(this.tipoRol).subscribe()
              })
            });
          });
          this.router.navigate(['listaruser']);
        }
      })

      
    }
  }
  init(){
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data)=>{
        this.form.setValue({
          codigo: data.id,
          username: data.username,
          password: data.password,
          mail: data.mail,
          estado: data.estado,
          address: data.address,
          phone: data.phone,
          dni: data.dni,
          enabled: data.enabled
        });
      });
    }
  }
}
