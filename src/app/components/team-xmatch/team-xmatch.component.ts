import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-team-xmatch',
  standalone: true,
  imports: [RouterOutlet, ListarComponent],
  templateUrl: './team-xmatch.component.html',
  styleUrl: './team-xmatch.component.css'
})
export class TeamXMatchComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}
}
