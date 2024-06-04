import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [RouterOutlet, ListarComponent, MatTableModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export class MatchComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
