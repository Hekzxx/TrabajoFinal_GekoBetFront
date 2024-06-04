import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Match } from '../../../models/Match';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit{
  displayedColumns: string[] = ['id', 'dateMatch', 'versus'];
  dataSource: MatTableDataSource<Match> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private mS: MatchService) { }
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    })
  }
}
