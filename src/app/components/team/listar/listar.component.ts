import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Team } from '../../../models/Team';
import { TeamService } from '../../../services/team.service';

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
  dataSource: MatTableDataSource<Team> = new MatTableDataSource();
  displayedColumns: string[] = ['Codigo', 'paiscountry', 'year','nameligue', 'nameteam', 'accion01', 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private st: TeamService){}
  ngOnInit(): void {
    this.st.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.st.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.st.eliminar(id).subscribe((data) => {
      this.st.list().subscribe((data) => {
        this.st.setList(data);
      });
    });
  }
  
}
