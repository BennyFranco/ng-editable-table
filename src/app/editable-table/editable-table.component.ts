import { Component, OnInit, Input } from '@angular/core';
import { TableRow } from '../util/table-row';
import { TableCell } from '../util/table-cell';

@Component({
  selector: 'nv-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

  @Input('table-headers') tableHeaders: TableCell[] = [];
  @Input('table-cells') tableCells: TableCell[] = [];
  @Input('table-rows') tableRows: TableRow[] = [];

  isEditing: TableRow[] = [];

  constructor() {
  }

  ngOnInit() {

  }

  addRow() {
    const newCells: TableCell[] = [];
    let newRow: TableRow;
    for (let i = 0; i < this.tableHeaders.length; i++) {
      newCells.push(new TableCell(''));
    }

    this.tableRows.push(
      newRow = new TableRow(newCells)
    );

    this.isEditing.push(newRow);
  }

  editRow(selectedRow: TableRow) {
    this.isEditing.push(selectedRow);
  }

  cancelEditing(selectedRow: TableRow) {
    this.isEditing = this.isEditing.filter(temporalRow => temporalRow !== selectedRow);
  }
}
