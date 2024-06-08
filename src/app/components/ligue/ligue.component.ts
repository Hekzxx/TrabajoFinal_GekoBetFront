import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-ligue',
  standalone: true,
  imports: [RouterOutlet, ListarComponent],
  templateUrl: './ligue.component.html',
  styleUrl: './ligue.component.css'
})
export class LigueComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
