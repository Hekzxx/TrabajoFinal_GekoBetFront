import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    CommonModule, 
    RouterLink],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {


  displayedColumns: string[] = ['username', 'mail', 'address', 'phone', 'dni'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UserService) { }
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.uS.eliminar(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}

