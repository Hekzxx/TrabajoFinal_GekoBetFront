import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

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
  listaestados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Verdadero' },
    { value: false, viewValue: 'Falso' }
  ]
  

  constructor(
    private formBuilder: FormBuilder,
    private uS: UserService,
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
      estado: ['', Validators.required],
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
      enabled: ['', Validators.required]
    })

  }


  registrar(): void {
    if (this.form.valid) {
      this.user.id = this.form.value.codigo
      this.user.username = this.form.value.username
      this.user.password = this.form.value.password
      this.user.mail = this.form.value.mail
      this.user.estado = this.form.value.estado
      this.user.address = this.form.value.address
      this.user.phone = this.form.value.phone
      this.user.dni = this.form.value.dni
      this.user.enabled = this.form.value.enabled


      this.uS.insert(this.user).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data)
        });
      });
      this.router.navigate(['listaruser']);
    }
  }
  init(){
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          mail: new FormControl(data.mail),
          estado: new FormControl (data.estado),
          address: new FormControl (data.address),
          phone: new FormControl (data.phone),
          dni: new FormControl (data.dni),
          enabled: new FormControl (data.enabled)
        });
      });
    }
  }





}
