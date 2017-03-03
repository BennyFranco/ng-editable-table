import { Component, OnInit } from '@angular/core';
import { TableRow } from '../util/table-row';
import { TableCell } from '../util/table-cell';

@Component({
  selector: 'nv-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

  isEditing: TableRow[] = [];
  tableHeaders: TableCell[] = [];
  tableCells: TableCell[] = [];
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

    this.tableRows.push(
      new TableRow(this.tableCells),
      new TableRow(this.tableCells)
    );
  }

  ngOnInit() {

  }

  editRow(selectedRow: TableRow) {
    this.isEditing.push(selectedRow);
  }

  cancelEditing(selectedRow: TableRow) {
    this.isEditing = this.isEditing.filter(temporalRow => temporalRow !== selectedRow);
  }
}
