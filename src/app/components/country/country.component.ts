import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [RouterOutlet, ListarComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {

  }
}
