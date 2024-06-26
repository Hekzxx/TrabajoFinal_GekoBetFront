import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/Role';
import { UserService } from '../../../services/user.service';

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
    MatButtonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = [ 'username','tipo', 'accion01', 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rS: RoleService,
    private us: UserService
  ) { }
  
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }


}
