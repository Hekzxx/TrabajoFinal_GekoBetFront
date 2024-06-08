import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-season',
  standalone: true,
  imports: [RouterOutlet, ListarComponent],
  templateUrl: './season.component.html',
  styleUrl: './season.component.css'
})
export class SeasonComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
