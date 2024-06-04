import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, ListarComponent, MatTableModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void { }
}
