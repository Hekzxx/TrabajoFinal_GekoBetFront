import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Ligue } from '../../../models/Ligue';
import { LigueService } from '../../../services/ligue.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  dataSource: MatTableDataSource<Ligue> = new MatTableDataSource();
  displayedColumns: string[] = ['paiscountry', 'year','nameligue', 'accion01', 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private lS: LigueService) { }
  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.lS.eliminar(id).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
      });
    });
  }
}
