import { Component, OnInit } from '@angular/core';
import { TableRow } from '../util/table-row';
import { TableCell } from '../util/table-cell';

@Component({
  selector: 'nv-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  tableHeaders: TableCell[] = [];
  tableCells: TableCell[] = [];
  tableCells2: TableCell[] = [];
  tableRows: TableRow[] = [];

  constructor() {
    this.tableHeaders.push(
      new TableCell('Header 1'),
      new TableCell('Header 2'),
      new TableCell('Header 3'),
      new TableCell('Header 4')
    );

    this.tableCells.push(
      new TableCell('Item 1'),
      new TableCell('Item 2'),
      new TableCell('Item 3'),
      new TableCell('Item 4')
    );

     this.tableCells2.push(
      new TableCell('Item 1'),
      new TableCell('Item 2'),
      new TableCell('Item 3'),
      new TableCell('Item 4')
    );


    this.tableRows.push(
      new TableRow(this.tableCells),
      new TableRow(this.tableCells2)
    );
  }

  ngOnInit() {
  }

}
