import { Component, OnInit } from '@angular/core';
import { TableHeader } from '../util/table-header';
import { TableRow } from '../util/table-row';
@Component({
  selector: 'nv-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

  isEditing: TableRow[] = [];
  tableRows: TableRow[] = [];
  tableHeaders: TableHeader[] = [];
  tablerow = new TableRow('camote');

  constructor() {
    this.tableHeaders.push(
      new TableHeader('Header1')
    );

    this.tableRows.push(
      new TableRow('Row1'),
      new TableRow('Row1')
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
