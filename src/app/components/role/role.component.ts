import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';


@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterOutlet, ListarComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit{
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {

  }
}
