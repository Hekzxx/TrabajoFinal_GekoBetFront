import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterOutlet, ListarComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit{
constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}
}
