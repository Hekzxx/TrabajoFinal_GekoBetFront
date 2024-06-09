import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Favorite } from '../../../models/Favorite';
import { FavoriteService } from '../../../services/favorite.service';

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
export class ListarComponent implements OnInit{
  dataSource: MatTableDataSource<Favorite> = new MatTableDataSource();
  displayedColumns: string[] = ['UsurioUser', 'Equiposteam','accion01', 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sF: FavoriteService) { }
  ngOnInit(): void {
    this.sF.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sF.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.sF.eliminar(id).subscribe((data) => {
      this.sF.list().subscribe((data) => {
        this.sF.setList(data);
      });
    });
  }
  
}
