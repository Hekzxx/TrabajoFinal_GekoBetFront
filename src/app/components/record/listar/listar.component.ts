import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Record } from '../../../models/Record';
import { RecordService } from '../../../services/record.service';
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
    MatButtonModule
  ],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  dataSource: MatTableDataSource<Record> = new MatTableDataSource();
  displayedColumns: string[] = ['Codigo', 'nameteam', 'record', 'dateRecord', 'accion01', 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rS: RecordService,
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
