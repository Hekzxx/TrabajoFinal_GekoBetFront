import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarComponent } from './listar/listar.component';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [RouterOutlet, ListarComponent],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent {
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}
}
