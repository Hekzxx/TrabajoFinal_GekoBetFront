import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { queryTeamEquiposFavXPaisDTO } from '../../../models/queryTeamEquiposFavXPaisDTO';
import { TeamService } from '../../../services/team.service';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/Country';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reporte02-maycol',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    RouterLink,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgIf
  ],
  templateUrl: './reporte02-maycol.component.html',
  styleUrl: './reporte02-maycol.component.css'
})
export class Reporte02MaycolComponent implements OnInit{
  dataSource: MatTableDataSource<queryTeamEquiposFavXPaisDTO> = new MatTableDataSource();
  form: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['nameteam'];
  listaCountries: Country[] = [];
  usuarioactual: string = "";
  mensaje: string = "";
  contequipos: number = 0;

  constructor(
    private tS: TeamService, 
    private formBuilder: FormBuilder,
    private uS:UserService,
    private loginService: LoginService,
    private cS:CountryService,
)
     {
    this.form = formBuilder.group({
      namecountry: ['', [Validators.required]],
      id: [''],
    })
  }

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.listaCountries = data;
    });

    this.usuarioactual=this.loginService.showUser();

    this.uS.list().subscribe((listausuarios)=>
    { 
      for (let usuario of listausuarios)
        {
          if (this.usuarioactual==usuario.username)
            {
              this.form.setValue({
                namecountry: '',
                id: usuario.id
              });
            }
        }
    })
  }

  getCantidad(): void {
    if (this.form.valid) {
      const namecountry = this.form.value.namecountry;
      const id = this.form.value.id;
      this.tS.equipos_favoritos_pais(namecountry,id).subscribe((data) => {
        this.contequipos=0;
        for (let equipos of data)
          {
            this.contequipos++;
          }
        this.mensaje = 'Se encontró ' + this.contequipos + ' equipos para el país ' + namecountry + '.';
        this.dataSource = new MatTableDataSource(data);
        });
      };
    }
  }







