import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insertaruser',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule
    , MatSelectModule, MatButtonModule, MatInputModule
  ],
  templateUrl: './insertaruser.component.html',
  styleUrl: './insertaruser.component.css'
})
export class InsertaruserComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  user: User = new User()

  listaestados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Verdadero' },
    { value: false, viewValue: 'Falso' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private uS: UserService,

    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      mail: ['', Validators.required],
      estado: ['', Validators.required],
      address: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]
      ],
      dni: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]],
      enabled: ['', Validators.required]
    })

  }


  registrar(): void {
    if (this.form.valid) {
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
        })
      });
      this.router.navigate(['listaruser/insertaruser']).then(() => {
        window.location.reload();
      });


    }
  }






}
